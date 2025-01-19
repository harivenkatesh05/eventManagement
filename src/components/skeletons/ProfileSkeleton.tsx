export default function ProfileSkeleton() {
    return (
        <div className="wrapper">
            <div className="breadcrumb-block">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-10">
                            <div className="barren-breadcrumb animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-48"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-container container mt-5 mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="profile-tabs mb-4">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <div className="nav-link active">
                                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link">
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="profile-details card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="h-8 bg-gray-200 rounded w-48"></div>
                                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                                </div>
                                <div className="row animate-pulse">
                                    <div className="col-md-6 mb-3">
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 