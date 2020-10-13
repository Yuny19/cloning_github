const baseUrl = 'http://localhost:3000';
$(document).ready(function () {
    const code = getUrlParameter('code');
    const token = localStorage.getItem('token');
    const url = location.href;
    window.history.pushState({}, "", url.split("?")[0]);

    if (!code && !token) {
        $("#login").show();
        $("#dashboard").hide();
    } else if (code && !token) {
        login(code);
    } else {
        $("#dashboard").show();
        $("#login").hide();
        $("#content").hide();

        getList(token);
        getUser(token);
    }


});

function login(code) {
    $.ajax({
        url: `${baseUrl}/${code}`,
        type: 'GET'
    })
        .done(function (data) {
            localStorage.setItem('token', data);
            location.reload();
        })
        .catch(function (error) {
            $.toast({
                heading: 'Warning',
                text: 'user cant login',
                showHideTransition: 'slide',
                icon: 'warning',
                position: 'top-right'
            })
        })
}

function getList() {
    $.ajax({
        url: `${baseUrl}/getRepo`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function (data) {
            for (let i = 0; i < data.length; i++) {
                var url = data[i].name;
                var list = '<button id="getDetail" class="text-blue-400 hover:text-black focus:outline-none" value="' + url + '">' + `${data[i].name}` + ' </button><br>'
                $("#listRepo").append(list);
            }
        })
        .catch(function (error) {
            $.toast({
                heading: 'Warning',
                text: 'data not found',
                showHideTransition: 'slide',
                icon: 'warning',
                position: 'top-right'
            })
        })
}

$(document).on("click", "#getDetail", function (event) {
    

    var repo = $(this).val();
    $.ajax({
        url: `http://localhost:3000/repos/Yuny19/${repo}`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function (data) {


            var html = '<tr>' +
                '<td class="border px-4 py-2">.Ds Store</td>' +
                '<td class="border px-4 py-2">file</td>' +
                '<td class="border px-4 py-2">' + data.size + '</td>' +
                '</tr>';

            var button = '<button id="deleteRepo" class="bg-red-700 text-white hover:bg-white hover:text-gray-800 font-semibold py-1 px-2 border border-gray-400 focus:outline-none rounded shadow" value="' + data.full_name + '">Delete Repository</button>';

            $("#body-table").html("");
            $("#delete-repo").html("");

            $("#body-table").append(html);
            $("#delete-repo").append(button);
            $("#content").show();
        })
        .catch(function (error) {
            alert(error.message);
        })
});

$(document).on("click", "#deleteRepo", function (event) {
    var repo = $(this).val();
    $.ajax({
        url: `http://localhost:3000/${repo}`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'DELETE'
    })
        .done(function (data) {
            location.reload();
            alert('delete success');
        })
        .catch(function (error) {
            alert(error.message);
        })
});


function getUser() {
    $.ajax({
        url: `${baseUrl}/user`,
        headers: {
            token: localStorage.getItem('token')
        },
        type: 'GET'
    })
        .done(function (data) {
            $("#user").append(`${data.login}`);
            $("#avatar").append(`<img class="rounded-full h-12 w-12" src="${data.avatar_url}" alt="Logo" />`)
        })
        .catch(function (error) {
            $.toast({
                heading: 'Warning',
                text: 'data not found',
                showHideTransition: 'slide',
                icon: 'warning',
                position: 'top-right'
            })
        })
}


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

$("#signOut").click(function () {
    var url = localStorage.key('token');
    localStorage.removeItem(url);
    location.reload();
});

$("#save-repo").click(function () {
    var name = $("#name-repo").val();
    var desc = $("#description-repo").val();
    var readme = $("#check-readme").val();
    debugger;
    $.ajax({
        url: `${baseUrl}/`,
        type: 'POST',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            name: name,
            description: desc,
            auto_init: readme,
        }
    })

        .done(function (data) {
            $.toast({
                heading: 'Success',
                text: 'repository ' + data.name + ' have been created',
                showHideTransition: 'slide',
                icon: 'success',
                position: 'top-right'
            });
        })
        .catch(function () {
            $.toast({
                heading: 'Warning',
                text: 'Cannot create your repository',
                showHideTransition: 'plain',
                icon: 'warning',
                position: 'top-right'
            })
        })

});

var openmodal = document.querySelectorAll('.modal-open')
for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function (event) {
        event.preventDefault()
        toggleModal()
    })
}

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

var closemodal = document.querySelectorAll('.modal-close')
for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal)
}

document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal()
    }
};


function toggleModal() {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
}