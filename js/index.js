

const ingredients = [];


function toggleAddIngridient(){
    const ingredient1 = document.getElementById('createIngridient1');
    const ingredient2 = document.getElementById('createIngridient2');
    const ingredient3 = document.getElementById('createIngridient3');
    const addIngredientButtonElement = document.getElementById('addIngredientButtonElement');

    addIngredientButtonElement.style.display = addIngredientButtonElement.style.display === 'block' ? 'none' : 'block';
    const isCurrentlyVisible = ingredient1.style.display === 'block';

    if (isCurrentlyVisible) {
        ingredient1.style.display = 'none';
        ingredient2.style.display = 'none';
        ingredient3.style.display = 'none';
        
    } else {
        ingredient1.style.display = 'block';
        ingredient2.style.display = 'block';
        ingredient3.style.display = 'block';
    }
}

function addIngredient() {
    const name = document.getElementById('createProductName').value;
    const unit = document.getElementById('createIngridientUnit').value;
    const quantity = document.getElementById('createIngridientQuantity').value;
    if (name && unit && quantity) {
        ingredients.push({ name, unit, quantity });
        console.log("ingridientes >>> " + ingredients);
        updateIngredientList();
        clearInputFields();
    } else {
        createAlertMessage("warning","Atenção!","Por favor, preencha todos os campos do ingrediente.");
    }
}

function updateIngredientList() {
    const ingredientList = document.getElementById('ingridientTableBody');
    ingredientList.innerHTML = '';  
    ingredients.forEach((ingredient, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${ingredient.name}</td>
            <td>${ingredient.quantity}</td>
            <td>${ingredient.unit}</td>
            <td>
            <button type="button" class="btn btn-primary btn-sm" onclick="editIngridient(${index})">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteIngridient(${index})">
                <i class="fas fa-trash-alt"></i> Eliminar
            </button>
            </td>
        `;
        ingredientList.appendChild(row);
    });
}
    

function clearInputFields() {
    document.getElementById('createProductName').value = '';
    document.getElementById('createIngridientUnit').value = '';
    document.getElementById('createIngridientQuantity').value = '';
}

function createAlertMessage(iconType,title,text){
    Swal.fire({
        icon: iconType,
        title: title,
        text: text
    });
    return;
}



function deleteIngridient(index) {
    ingredients.splice(index, 1);
    updateIngredientList();
    createAlertMessage("success","Sucesso!","Ingrediente eliminado com sucesso.");
}

function editIngridient(index) {
    const ingredient = ingredients[index];
    document.getElementById('createIngridient1').style.display = 'block';
    document.getElementById('createIngridient2').style.display = 'block';
    document.getElementById('createIngridient3').style.display = 'block';
    document.getElementById('addIngredientButtonElement').style.display = 'none';
    document.getElementById('editIngredientButtonElement').style.display = 'block';
    document.getElementById('cancelEditIngredientButtonElement').style.display = 'block';

    document.getElementById('saveChangesButton').setAttribute('data-edit-index', index);
    document.getElementById('createProductName').value = ingredient.name;
    document.getElementById('createIngridientUnit').value = ingredient.unit;
    document.getElementById('createIngridientQuantity').value = ingredient.quantity;
}

function cancelEdit() {
    clearInputFields();
    document.getElementById('createIngridient1').style.display = 'none';
    document.getElementById('createIngridient2').style.display = 'none';
    document.getElementById('createIngridient3').style.display = 'none';
    document.getElementById('addIngredientButtonElement').style.display = 'block';
    document.getElementById('editIngredientButtonElement').style.display = 'none';
    document.getElementById('cancelEditIngredientButtonElement').style.display = 'none';
}