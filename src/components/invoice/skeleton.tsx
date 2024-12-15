export default function InvoiceSkeleton() {
  return (
    <div className="invoice clearfix">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-md-10">
            <div className="skeleton-box w-100" style={{ height: '80px' }}></div>
            <div className="mt-4">
              <div className="skeleton-box w-50 mb-3" style={{ height: '30px' }}></div>
              <div className="row">
                <div className="col-md-6">
                  <div className="skeleton-box w-75 mb-2" style={{ height: '20px' }}></div>
                  <div className="skeleton-box w-75 mb-2" style={{ height: '20px' }}></div>
                </div>
                <div className="col-md-6">
                  <div className="skeleton-box w-75 mb-2" style={{ height: '20px' }}></div>
                  <div className="skeleton-box w-75 mb-2" style={{ height: '20px' }}></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="skeleton-box w-100" style={{ height: '200px' }}></div>
              </div>
              <div className="mt-4">
                <div className="skeleton-box w-100" style={{ height: '300px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 