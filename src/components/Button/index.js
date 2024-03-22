export const TypeButton = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
};

export const Button = ({ typeButton, children, ...props }) =>{   
    const buttonClass = typeButton === typeButton.PRIMARY ? 'btn btn-primary me-2' : 'btn btn-secondary';
          
    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
}