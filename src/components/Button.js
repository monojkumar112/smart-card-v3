const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={'login-btn'}
        {...props}
    />
)

export default Button
