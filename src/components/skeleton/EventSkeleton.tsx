export default function EventSkeleton() {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <div className="main-card">
        <div className="skeleton-box" style={{height: '200px', width: '100%'}}></div>
        <div className="event-content p-3">
          <div className="skeleton-box" style={{height: '24px', width: '60%', marginBottom: '10px'}}></div>
          <div className="skeleton-box" style={{height: '18px', width: '40%', marginBottom: '15px'}}></div>
          <div className="skeleton-box" style={{height: '16px', width: '30%'}}></div>
        </div>
      </div>
    </div>
  );
} 