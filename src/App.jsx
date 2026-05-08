import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import "./App.css";

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    let channel;

    const fetchAlerts = async () => {
      const { data, error } = await supabase
        .from("sos_alerts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Fetch error:", error);
        return;
      }

      setAlerts(data || []);
    };

    fetchAlerts();

    // REALTIME
    channel = supabase
      .channel("sos-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sos_alerts",
        },
        (payload) => {
          setAlerts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="dashboard-container">

      <header className="dashboard-header">
        <h1 className="dashboard-title">
          SOS Emergency Dashboard
        </h1>
      </header>

      {alerts.length === 0 && (
        <p className="no-alerts">No SOS alerts found</p>
      )}

      <div className="alerts-grid">
        {alerts.map((alert) => (
          <div className="alert-card" key={alert.id}>

            <div className="card-header">
              <span className="badge">
                {alert.status?.toUpperCase() || "ACTIVE"}
              </span>

              <span className="time">
                {new Date(alert.created_at).toLocaleString()}
              </span>
            </div>

            {/* AUDIO */}
            {alert.audio_url && (
              <div className="section">
                <p className="label">🎙️ Emergency Audio</p>
                <audio controls src={alert.audio_url} />
              </div>
            )}

            {/* LOCATION */}
            <div className="section">
              <p className="label">📍 Location</p>

              {alert.latitude && alert.longitude ? (
                <a
                  className="map-link"
                  href={`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Google Maps
                </a>
              ) : (
                <span className="value">
                  {alert.location || "No location"}
                </span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;