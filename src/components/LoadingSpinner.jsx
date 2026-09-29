import "../TeacherPanel/style/LoadingSpinner.css";

export default function LoadingSpinner({ label = "جارٍ التحميل" }) {
  return (
    <div className="loading-spinner-container" role="status">
      <span className="loading-spinner" aria-hidden="true" />
      <span className="loading-spinner-label">{label}</span>
    </div>
  );
}