document.getElementById('main-form').addEventListener('submit', onSubmit)

function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const base = formData.get('base');
    document.getElementById('test').innerHTML = base;
    fetchJSON();
}

function fetchJSON(){

}
