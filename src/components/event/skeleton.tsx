export default function EventDetailSkeleton() {
  return (
    <div className="wrapper">
      <div className="breadcrumb-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-10">
              <div className="barren-breadcrumb skeleton-box" style={{height: '24px', width: '50%'}}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="event-dt-block p-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="event-top-dts">
                <div className="event-top-date skeleton-box" style={{height: '80px', width: '80px'}}></div>
                <div className="event-top-dt">
                  <div className="skeleton-box" style={{height: '32px', width: '70%', marginBottom: '16px'}}></div>
                  <div className="skeleton-box" style={{height: '24px', width: '40%'}}></div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-12">
              <div className="main-event-dt">
                <div className="event-img skeleton-box" style={{height: '400px', width: '100%'}}></div>
                <div className="main-event-content">
                  <div className="skeleton-box" style={{height: '24px', width: '30%', marginBottom: '16px'}}></div>
                  <div className="skeleton-box" style={{height: '16px', width: '100%', marginBottom: '8px'}}></div>
                  <div className="skeleton-box" style={{height: '16px', width: '90%', marginBottom: '8px'}}></div>
                  <div className="skeleton-box" style={{height: '16px', width: '95%'}}></div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-12">
              <div className="main-card event-right-dt">
                <div className="skeleton-box" style={{height: '24px', width: '40%', marginBottom: '24px'}}></div>
                <div className="skeleton-box" style={{height: '100px', width: '100%', marginBottom: '24px'}}></div>
                <div className="skeleton-box" style={{height: '80px', width: '100%', marginBottom: '16px'}}></div>
                <div className="skeleton-box" style={{height: '80px', width: '100%', marginBottom: '16px'}}></div>
                <div className="skeleton-box" style={{height: '80px', width: '100%', marginBottom: '16px'}}></div>
                <div className="skeleton-box" style={{height: '48px', width: '100%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 