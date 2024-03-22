export const TypeButton = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
};

export const Button = ({ typeButton, children, ...props }) =>{   
    const buttonClass = typeButton === TypeButton.PRIMARY ? 'btn btn-primary me-2' : 'btn btn-danger';
          
    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
}