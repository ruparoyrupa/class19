
// get elements

const deves_skill = document.getElementById('deves-skill');
const deves_add_form = document.getElementById('deves-add-form');
const deves_edite_form = document.getElementById('deves-edite-form');
const deves_delete_form = document.getElementById('deves-delete-form');
const deves_data_list = document.getElementById('deves-data-list');
const mess = document.querySelector('.mess');

const loadSkills = () => {
    axios('http://localhost:4040/Skills').then(data => {

      skill_list = '';

      data.data.map( skills => {
          skill_list += `
          <option value="${skills.id}">${skills.skill}</option>

          `

         
      });

      deves_skill.insertAdjacentHTML('afterbegin',skill_list);
     

    });

};

loadSkills();

/**
 * Get Developer
 */


 const getDevelopers = () => {
    axios.get('http://localhost:4040/Developers').then(res => {

     deves_data = '';

      res.data.map( (deves,index) => {
        deves_data += `
        <tr>
        <td>${index + 1}</td>
        <td>${deves.name}</td>
        <td> ${deves.age}</td>
        <td> ${deves.email}</td>
        <td>${deves.location}</td>
        <td>Java developer</td>
        <td><img style="object-fit: cover; height: 50px; width: 50px;" src="${deves.photo}" alt=""></td>
        <td>
            <a class="btn btn-info btn-sm" data-bs-toggle="modal" onclick="viewDeveloper(${deves.id})" href="#modal-view"><i class="fa fa fa-eye"></i></a>
            <a class="btn btn-warning btn-sm" data-bs-toggle="modal"  onclick="editeDeveloper(${deves.id})" href="#modal-edite"><i class="fa fa fa-edit"></i></a>
            <a class="btn btn-danger btn-sm" data-bs-toggle="modal" onclick=" deleteDeveloper(${deves.id})"  href="#modal-delete"><i class="fa fa fa-trash"></i></a>

        </td>
    </tr>

          `

         
      });

      deves_data_list.innerHTML = deves_data;
     

    });

};

getDevelopers();



/**
 * Add new developers
 */


 deves_add_form.addEventListener( 'submit', function(e){
   e.preventDefault();

   let name = this.querySelector('#name');
   let email = this.querySelector('#email');
   let age = this.querySelector('#age');
   let location = this.querySelector('#location');
   let photo = this.querySelector('#photo');
   let skill = this.querySelector('#deves-skill');
   

   if (name.value == '' || email.value == '' || age.value == '' || location.value == '' || photo.value == '' || skill.value == '') {
    mess.innerHTML =  `<p class = 'alert alert-danger'> All fields are required !</p>`
   }else{

    axios.post('http://localhost:4040/Developers',{
        id       :"",
        name     : name.value,
        email    : email.value,
        age      : age.value,
        location : location.value,
        skillId  : skill.value,
        photo    : photo.value
    }).then(res => {
        name.value = '',
        email.value = '',
        age.value = '',
        location.value = '',
        skill.value = '',
        photo.value = ''
      

        getDevelopers();
    });

}
  
  
 });



  /**
  * View developers data
  */

   function viewDeveloper(id){
      
    let name = document.querySelector('#view-name');
    let email = document.querySelector('#view-email');
    let age = document.querySelector('#view-age');
    let location = document.querySelector('#view-location');
    let photo = document.querySelector('#view-photo');
    let preview = document.querySelector('#view-preview');
    let skill = document.querySelector('#view-deves-skill');
   

    axios.get(`http://localhost:4040/Developers/${id}`).then(res => {
       
        name.value   = res.data.name,
        email.value   = res.data.email,
        age.value   = res.data.age,
        location.value   = res.data.location,
        photo.value   = res.data.photo,
        skill.value   = res.data.skillId,
        preview.setAttribute('src',res.data.photo)
    });
    
  };


 /**
  * Edite developers data
  */

  function editeDeveloper(id){
      
    let name = document.querySelector('#edite-name');
    let email = document.querySelector('#edite-email');
    let age = document.querySelector('#edite-age');
    let location = document.querySelector('#edite-location');
    let photo = document.querySelector('#edite-photo');
    let preview = document.querySelector('#preview');
    let skill = document.querySelector('#edite-deves-skill');
    let edite_id = document.querySelector('#edite-id');

    axios.get(`http://localhost:4040/Developers/${id}`).then(res => {
       
        name.value   = res.data.name,
        email.value   = res.data.email,
        age.value   = res.data.age,
        location.value   = res.data.location,
        photo.value   = res.data.photo,
        skill.value   = res.data.skillId,
        edite_id.value   = id,
        preview.setAttribute('src',res.data.photo)
    });
    
  };


  deves_edite_form.addEventListener( 'submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#edite-name');
    let email = this.querySelector('#edite-email');
    let age = this.querySelector('#edite-age');
    let location = this.querySelector('#edite-location');
    let photo = this.querySelector('#edite-photo');
    let skill = this.querySelector('#edite-deves-skill');
    let edite_id = this.querySelector('#edite-id');


    axios.patch(`http://localhost:4040/Developers/${edite_id.value}`,{
        name     : name.value,
        email    : email.value,
        age      : age.value,
        location : location.value,
        skillId  : skill.value,
        photo    : photo.value
    }).then(res => {
        name.value = '',
        email.value = '',
        age.value = '',
        location.value = '',
        skill.value = '',
        photo.value = ''
      
        getDevelopers();
    });
    
  });


 /**
  * Delete developers data
  */

  function deleteDeveloper(id){
      
    let name = document.querySelector('#delete-name');
    let email = document.querySelector('#delete-email');
    let age = document.querySelector('#delete-age');
    let location = document.querySelector('#delete-location');
    let photo = document.querySelector('#delete-photo');
    let preview = document.querySelector('#delete-preview');
    let skill = document.querySelector('#delete-deves-skill');
    let edite_id = document.querySelector('#delete-id');

    axios.get(`http://localhost:4040/Developers/${id}`).then(res => {
       
        name.value   = res.data.name,
        email.value   = res.data.email,
        age.value   = res.data.age,
        location.value   = res.data.location,
        photo.value   = res.data.photo,
        skill.value   = res.data.skillId,
        edite_id.value   = id,
        preview.setAttribute('src',res.data.photo)
    });
    
  };


  deves_delete_form.addEventListener( 'submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#delete-name');
    let email = this.querySelector('#delete-email');
    let age = this.querySelector('#delete-age');
    let location = this.querySelector('#delete-location');
    let photo = this.querySelector('#delete-photo');
    let skill = this.querySelector('#delete-deves-skill');
    let delete_id = this.querySelector('#delete-id');


    axios.delete(`http://localhost:4040/Developers/${delete_id.value}`,{
        name     : name.value,
        email    : email.value,
        age      : age.value,
        location : location.value,
        skillId  : skill.value,
        photo    : photo.value


        
    }).then(res => {
        
        getDevelopers();

    });
      
      
       
    
    
  });
