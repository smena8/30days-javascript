
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    events = ['click', 'keydown']
    events.forEach(event => {
        button.addEventListener(event, function(e){
                e.preventDefault();
                this.blur();
                if ((e.key === 'Enter') || (e.key === ' ')){
                    this.focus();
                }
            })
        })
    })

document.body.addEventListener('keydown', function(e){
    console.log(e)
    if (document.querySelector('button[data-number="'+e.key+'"]')) {
        button = document.querySelector('button[data-number="'+e.key+'"]').focus();
        console.log(e.key);
    } else if ( (e.key === '+') || (e.key === '-') || (e.key === '*') || (e.key === '/') || (e.key === '=')) {
        e.preventDefault();
        if (document.querySelector('button[data-action="'+e.key+'"]')) {
            button = document.querySelector('button[data-action="'+e.key+'"]').focus();
            console.log(e.key);
        }
    }
})