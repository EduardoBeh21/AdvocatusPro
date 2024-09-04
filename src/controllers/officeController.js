const Escritorio = require('../models/Escritorio');

// Criação de um escritório
exports.createOffice = async (req, res) => {
  try { 
    console.log('Dados recebidos:', req.body);
    const { Nome, CNPJ, Logo, Dominio, Celular, Telefone, Cep, Cidade, Estado, Pais, Rua, Numero, Complemento, Tipo_de_residencia } = req.body;


    const newOffice = await Escritorio.create({
      Nome,
      CNPJ, 
      Logo, 
      Dominio, 
      Celular, 
      Telefone, 
      Cep, 
      Cidade, 
      Estado, 
      Pais, 
      Rua, 
      Numero, 
      Complemento, 
      Tipo_de_residencia
    });

    res.status(201).json(newOffice);
  } catch (error) {
    console.error('Error creating office:', error);
    res.status(500).json({ message: 'Error creating office', error: error.message });
  }
};

// Gerenciamento de um escritório (atualização)
exports.manageOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nome, CNPJ, Logo, Dominio, Celular, Telefone, Cep, Cidade, Estado, Pais, Rua, Numero, Complemento, Tipo_de_residencia } = req.body;
    
    const office = await Escritorio.findByPk(id);
    if (!office) {
      return res.status(404).json({ message: 'Office not found' });
    }

    office.Nome = Nome || office.Nome;
    office.CNPJ = CNPJ || office.CNPJ;
    office.Logo = Logo || office.Logo;
    office.Dominio = Dominio || office.Dominio;
    office.Celular = Celular || office.Celular;
    office.Telefone = Telefone || office.Telefone;
    office.Cep = Cep || office.Cep;
    office.Cidade = Cidade || office.Cidade;
    office.Estado = Estado || office.Estado;
    office.Pais = Pais || office.Pais;
    office.Rua = Rua || office.Rua;
    office.Numero = Numero || office.Numero;
    office.Complemento = Complemento || office.Complemento;
    office.Tipo_de_residencia = Tipo_de_residencia || office.Tipo_de_residencia;

    await office.save();
    res.status(200).json(office);
  } catch (error) {
    console.error('Error managing office:', error);
    res.status(500).json({ message: 'Error managing office' });
  }
};

// Exclusão de um escritório
exports.deleteOffice = async (req, res) => {
  try {
    const { id } = req.params;
    
    const office = await Escritorio.findByPk(id);
    if (!office) {
      return res.status(404).json({ message: 'Office not found' });
    }

    await office.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting office:', error);
    res.status(500).json({ message: 'Error deleting office' });
  }
};
