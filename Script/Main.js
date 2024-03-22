const app = Vue.createApp({
    data() {
        return {
            defaultFoodImage: './IMG/PastelAmostra.png',
            defaultDrinkImage: './IMG/Suco.png'
        };
    },
    methods: {
        Limpar() {
            document.getElementById("inputTitle").value = "";
            document.getElementById("inputTasting").value = "";
            document.getElementById("ValueOfFood").value = "";
            document.getElementById("TextArea").value = "";

            // Verifica se a imagem de pré-visualização está presente e a remove
            var imageContent = document.getElementById("imageContent")

            var imagePreview = document.getElementById("imagem-preview");
            if (imagePreview) {
                imagePreview.src = "";
                this.imagePreview = ""; // Limpa o valor da imagem de pré-visualização no Vue
                imageContent.style.display="block";
                imagePreview.style.display="none"
            }
        },
        Cadastrar() {
            /* a baixo os valores do input */
            var inputTasting = document.getElementById("inputTasting").value.trim();
            var TextArea = document.getElementById("TextArea").value.trim();
            var inputTitle = document.getElementById("inputTitle").value.trim();
            var ValueOfFood = document.getElementById("ValueOfFood").value.trim();
            var foodImage = document.getElementById("imagem").files.length > 0 ? URL.createObjectURL(document.getElementById("imagem").files[0]) : this.defaultFoodImage;
            var drinkImage = document.getElementById("imagem").files.length > 0 ? URL.createObjectURL(document.getElementById("imagem").files[0]) : this.defaultDrinkImage;
            /* acima os valores do input */

            // Verifica se os campos estão vazios
            if (inputTasting === '' || TextArea === '' || inputTitle === '' || ValueOfFood === '') {
                alert('Por favor, preencha todos os campos');
                return; // Para a execução da função
            }

            // Verifica se o comprimento do inputTitle está entre 3 e 60 caracteres
            if (inputTitle.length < 3 || inputTitle.length > 60) {
                alert('O título do pedido deve conter entre 3 e 60 caracteres');
                return; // Para a execução da função
            }

            // Verifica se o comprimento do inputTasting está entre 3 e 60 caracteres
            if (inputTasting.length < 3 || inputTasting.length > 60) {
                alert('O sabor deve conter entre 3 e 60 caracteres');
                return; // Para a execução da função
            }

            var checkbox = document.getElementById("check");

            var containerFood = document.createElement("div");
            containerFood.id = "requestsFoodContainer";

            var containerDrink = document.createElement("div");
            containerDrink.id = "requestsDrinkContainer";

            var newFood = document.createElement("div");
            newFood.className = "requestsFood";
            newFood.innerHTML = `
                <img src="${foodImage}">
                <div class="FriedPastry">
                    <h2>"Ajeita rapidinho pra mim"</h2>
                    <h3>R$:10,00</h3>
                </div>
                <div class="InfoPastry">
                    <h3>Sabor:</h3><p>${inputTasting}</p><br>
                    <h3>Descrição: </h3><p>${TextArea}</p>
                </div>
            `;

            var newDrink = document.createElement("div");
            newDrink.className = "requestsDrink";
            newDrink.innerHTML = `
                <img src="${drinkImage}">
                <div class="FriedPastry">
                    <h2>"Ajeita rapidinho pra mim"</h2>
                    <h3>R$:05,00</h3>
                </div>
                <div class="InfoPastry">
                    <h3>Sabor:</h3><p>${inputTasting}</p><br>
                    <h3>Descrição: </h3><p>${TextArea}</p>
                </div>
            `;

            var inputContainer = document.querySelector('.input-container');

            if (checkbox.checked) {
                console.log("Bebida selecionada");
                containerDrink.appendChild(newDrink);
                inputContainer.appendChild(containerDrink); // Adiciona dentro da div com a classe input-container
            } else {
                console.log("Comida selecionada");
                containerFood.appendChild(newFood);
                inputContainer.appendChild(containerFood); // Adiciona dentro da div com a classe input-container
            }
        }
    }
});

app.mount('#app');


const ImageField = {
    data() {
        return {
            imagePreview: ''
        };
    },
    methods: {
        previewImage(event) {
            const input = event.target;
            const preview = this.$refs.fileInput.files[0];
            const reader = new FileReader();
  
            // Exibe a imagem de pré-visualização
            this.$refs.fileInput.nextElementSibling.style.display = 'none';
            this.$refs.fileInput.nextElementSibling.nextElementSibling.style.display = 'block';
  
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(preview);
        },
        submitForm() {
            // Lógica para enviar o formulário, se necessário
        }
    }
};

Vue.createApp(ImageField).mount('.demonstration');
