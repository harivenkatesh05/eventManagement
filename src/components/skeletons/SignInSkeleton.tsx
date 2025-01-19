export default function SignInSkeleton() {
    return (
        <div className="form-wrapper">
            <div className="app-form">
                <div className="app-form-sidebar animate-pulse">
                    <div className="sidebar-sign-logo">
                        <div className="h-16 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="sign_sidebar_text">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="app-form-content">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10">
                                <div className="app-top-items">
                                    <div className="flex items-center justify-center">
                                        <div className="h-12 w-32 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-6 col-md-7">
                                <div className="registration animate-pulse">
                                    <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                            <div className="h-12 bg-gray-200 rounded w-full"></div>
                                        </div>
                                        <div>
                                            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                            <div className="h-12 bg-gray-200 rounded w-full"></div>
                                        </div>
                                        <div className="h-12 bg-gray-200 rounded w-full"></div>
                                    </div>
                                    <div className="divider my-6">
                                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                                    </div>
                                    <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright-footer">
                        <div className="h-4 bg-gray-200 rounded w-64"></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 