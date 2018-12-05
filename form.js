  function add_guest() {
    var invite_form = document.getElementById('invite_form')
    var form_ting = document.createElement('form')
    form_ting.innerHTML = '<input name="name" type="text" value placeholder="Guest Name" required/> <input name="dietary" type="text" value placeholder="Dietary Requirements"/> <input name="attending" type="radio" value="yes" required/> I\'m coming - can\'t wait! <br/> <input name="attending" type="radio" value="no" required/> Sorry to miss it'
    invite_form.appendChild(form_ting);
}

function remove_guest() {
    var invite_form = document.getElementById('invite_form')
    invite_form.removeChild(invite_form.children[invite_form.children.length-1])
}

function submit_data() {
    var whole_form = document.getElementById("invite_form");
    const url = 'https://script.google.com/macros/s/AKfycbw6fKPF4MtEjSmtgUNWrFyHEZdSnWaDvEGYY_GH1tMmCQz7kb4/exec'
    document.getElementById('required_ting').style.visibility = 'hidden'
    var utc = new Date().toJSON().slice(0, 19);
    for (i = 0; i < whole_form.children.length; i++) {
        guest = whole_form.children[i]
	console.log(guest)
        var xhr = new XMLHttpRequest();
        var name = encodeURI(guest.elements.name.value)
        var dietary = encodeURI(guest.elements.dietary.value)
        var attending = encodeURI(guest.elements.attending.value)
            var params = '?name=' + name + '&attending=' + attending + '&timestamp=' + utc
            if (dietary) {
                params += '&dietary=' + dietary
            } else {
                params += '&dietary=N/A'
            }
            var sub_url = url + params
            console.log(sub_url)
            xhr.open("GET", sub_url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById('whole_form').style.display = "none"
                    document.getElementById('thanks').style.display = "block"
                } else if (xhr.status != 200) {
                    document.getElementById('whole_form').style.display = "none"
                    document.getElementById('whoops').style.display = "block"
                }}
            xhr.send('');
}
    }


function check_form_validation(form) {
    for (i = 0; i < form.children.length; i++) {
        for (j = 0; j < form.children[i].elements.length; j++) {
            if (form.children[i].elements[j].required && form.children[i].elements[j].value == "") {
                document.getElementById('required_ting').style.visibility = 'visible'
                console.log('x')
                return false
            }
    }}
	return true}

function whole_function(){
var form = document.getElementById('invite_form')
  if (check_form_validation(form)){
    submit_data()
  }
}
