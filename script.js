document.addEventListener('DOMContentLoaded', function () {
    const servicesData = {
        development: {
            title: 'Desenvolvimento Web',
            description: 'Criamos sites modernos e dinâmicos com as melhores tecnologias do mercado.',
            subServices: ['Design de interface', 'Criação de conteúdo', 'SEO'],
        },
        design: {
            title: 'Design Gráfico',
            description: 'Design criativo para identidade visual, marcas e materiais gráficos.',
            subServices: ['Logotipo', 'Design de materiais', 'Social media'],
        },
        seo: {
            title: 'Otimização SEO',
            description: 'Aumente a visibilidade do seu site nos motores de busca e melhore o tráfego orgânico.',
            subServices: ['Pesquisa de palavras-chave', 'Otimização On-Page', 'Link Building'],
        }
    };

    // Mostrar o modal ao clicar no botão "Saber Mais"
    document.querySelectorAll('.btn-more').forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceKey = e.target.dataset.service;
            const service = servicesData[serviceKey];

            // Preencher o modal com informações do serviço
            document.getElementById('modalTitle').innerText = service.title;
            document.getElementById('modalDescription').innerText = service.description;

            // Exibir os subserviços no select
            const subServicesSelect = document.getElementById('subServicesSelect');
            subServicesSelect.innerHTML = ''; // Limpar lista existente
            service.subServices.forEach(subService => {
                const option = document.createElement('option');
                option.value = subService;
                option.innerText = subService;
                subServicesSelect.appendChild(option);
            });

            // Mostrar o modal
            document.getElementById('modal').style.display = 'block';
        });
    });

    // Fechar o modal
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });

    // Confirmar o serviço e gerar a fatura
    document.getElementById('confirmService').addEventListener('click', () => {
        const clientName = document.getElementById('clientName').value.trim();
        const paymentType = document.getElementById('paymentType').value;

        if (!clientName) {
            alert('Preencha todos os campos.');
            return;
        }

        const serviceTitle = document.getElementById('modalTitle').innerText;

        // Capturar os subserviços selecionados
        const subServicesSelect = document.getElementById('subServicesSelect');
        const selectedSubServices = Array.from(subServicesSelect.selectedOptions).map(option => option.value);

        // Gerar o PDF com jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Cabeçalho da fatura
        doc.setFontSize(18);
        doc.text('Fatura de Serviço', 105, 20, null, null, 'center');
        doc.setFontSize(12);
        doc.text('Nome do Site: Criativa Desenvolvimento', 20, 30);
        doc.text('Endereço do Site: www.creativedesenvolvimento.com', 20, 35);
        doc.text('Telefone: (+244) 949-933-515', 20, 40);
        doc.text('Email: contato@creativemodernwebsite.com', 20, 45);

        // Dados do cliente e do serviço
        doc.text(`Cliente: ${clientName}`, 20, 55);
        doc.text(`Tipo de Serviço: ${serviceTitle}`, 20, 60);
        doc.text(`Subserviços Selecionados: ${selectedSubServices.length > 0 ? selectedSubServices.join(', ') : 'Nenhum'}`, 20, 65);
        doc.text(`Valor a Pagar: R$ 1000,00`, 20, 70);
        doc.text(`Tipo de Pagamento: ${paymentType}`, 20, 75);

        // Linha de separação
        doc.setLineWidth(0.5);
        doc.line(20, 95, 190, 95);

        // Rodapé
        doc.text('Obrigado por escolher nossos serviços!', 105, 250, null, null, 'center');
        doc.text('Creative Modern Website - Inovação e Criatividade', 105, 255, null, null, 'center');

        // Gerar o PDF e fazer o download
        doc.save('fatura_servico.pdf');

        // Fechar o modal após gerar a fatura
        document.getElementById('modal').style.display = 'none';
    });
});
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const buttons = document.querySelectorAll('.btn-more');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.dataset.service;
        document.getElementById('modalTitle').innerText = `Mais sobre ${service}`;
        modal.classList.add('show');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
