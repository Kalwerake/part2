const Notification = ({message}) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid'
    }

    if (message === null) {
    return null
  }

    return(
        <div style={notificationStyle}>
            {message}

        </div>
    )
}

export default Notification