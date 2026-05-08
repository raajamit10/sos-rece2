import "./AlertCard.css";

function AlertCard({ alert }) {
  return (
    <div className="alert-card">

      {/* HEADER */}
      <header>
        <h3>🚨 SOS ALERT</h3>

        <span className="status-badge">
          {alert.status?.toUpperCase() || "PENDING"}
        </span>
      </header>

      {/* USER INFO */}
      <p><b>User ID:</b> {alert.user_id}</p>

      {alert.name && <p><b>Name:</b> {alert.name}</p>}
      {alert.phone && <p><b>Phone:</b> {alert.phone}</p>}
      {alert.guardian_phone && (
        <p><b>Guardian:</b> {alert.guardian_phone}</p>
      )}

      {/* MESSAGE */}
      {alert.message && (
        <p><b>Message:</b> {alert.message}</p>
      )}

      {/* LOCATION */}
      <div className="location">
        <b>Location:</b>

        {alert.latitude && alert.longitude ? (
          <a
            href={`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps 📍
          </a>
        ) : (
          <span>{alert.location || "No location provided"}</span>
        )}
      </div>

      {/* AUDIO */}
      {alert.audio_url && (
        <audio controls>
          <source src={alert.audio_url} type="audio/webm" />
        </audio>
      )}

      {/* TIME */}
      <p className="time">
        🕒 {new Date(alert.created_at).toLocaleString()}
      </p>

    </div>
  );
}

export default AlertCard;