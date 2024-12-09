export default function CardSkeleton() {
  return (
    <div className="main-card">
      <div className="event-thumbnail mt-2">
        <div className="thumbnail-img skeleton-box" style={{height: '200px'}}></div>
      </div>
      <div className="event-content">
        <div className="event-title skeleton-box" style={{height: '24px', width: '80%'}}></div>
        <div className="duration-price-remaining">
          <span className="duration-price skeleton-box" style={{height: '20px', width: '40%'}}></span>
          <span className="remaining skeleton-box" style={{height: '20px', width: '30%'}}></span>
        </div>
      </div>
      <div className="event-footer">
        <div className="event-timing">
          <div className="publish-date">
            <span className="skeleton-box" style={{height: '18px', width: '100px'}}></span>
          </div>
          <span className="publish-time skeleton-box" style={{height: '18px', width: '50px'}}></span>
        </div>
      </div>
    </div>
  )
} 