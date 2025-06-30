export default function ErrorMessage({ error }) {
  return error ? <p className="error-message">{error}</p> : null;
}