const AuthCard = ({ logo, children }) => (
    <div className=" flex flex-col sm:justify-center items-center pt-6 sm:pt-0  login-hight-item">
        <div className="flex align-items-center flex-column">
            {logo}
            {/* <p className="mt-2">Share personalized contact details.</p> */}
        </div>

        <div className="login-container">
            {children}
        </div>
    </div>
)

export default AuthCard
