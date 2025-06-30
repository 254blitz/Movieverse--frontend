export default function LoadingSpinner({ loading }) {
  return loading ? (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  ) : null;
}