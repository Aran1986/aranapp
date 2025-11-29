export default function Footer() {
  return (
    <footer style={{
      height: 'var(--footer-height)',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      fontSize: '13px',
      color: 'var(--text-secondary)'
    }}>
      <div>AranApp © 2025 - سوپر اپ وب۳</div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <span>نسخه 1.0.0</span>
        <span>•</span>
        <span>🌐 متصل</span>
      </div>
    </footer>
  )
}