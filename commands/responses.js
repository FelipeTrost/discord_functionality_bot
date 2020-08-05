module.exports = (msg, parameter) => {
    let response;

    switch(parameter){
        case 'hi':
            response = 'Hi!';
            break;
        default:
            response = 'Sorry, nothing available.'
    }
    
    msg.reply(response);
}