const Student = require('../models/Student'); 


async function getAllStudents(req, res) {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (err) {
    console.error('Erro ao buscar estudantes:', err);
    res.status(500).json({ message: 'Erro ao buscar estudantes' });
  }
}


async function getStudent(req, res) {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Estudante não encontrado' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Erro ao buscar estudante por ID:', err);

    res.status(500).json({ message: 'Erro ao buscar estudante por ID' });
  }
}

async function signUpStudent(req, res) {
  const { email, password, passwordConfirmation } = req.body;


  if (!email || !password || !passwordConfirmation) {
    return res.status(400).json({
      message: 'Os dados introduzidos não são válidos.',
      errors: {
        email: !email ? 'O endereco introduzido ja esta registado.' : undefined,
        password: !password ? 'Senha é obrigatória.' : undefined,
        passwordConfirmation: !passwordConfirmation ? 'As passwords nao coincidem.' : undefined,
      },
    });
  }


  try {

    let existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'O endereco introduzido ja esta registado.' });
    }

    const newStudent = new Student({
      email,
      password, 
    });

   
    await newStudent.save();

    res.status(201).json({ message: 'Estudante criado com sucesso.' });
  } catch (err) {
    console.error('Erro ao criar estudante:', err);
    res.status(500).json({ message: 'Erro ao criar estudante' });
  }
}

async function loginStudent(req, res) {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({
      message: 'Os dados introduzidos não são válidos.',
      errors: {
        email: !email ? 'Email é obrigatório.' : undefined,
        password: !password ? 'Senha é obrigatória.' : undefined,
      },
    });
  }


  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: 'Estudante não encontrado.' });
    }

  
    if (password !== student.password) {
      return res.status(401).json({ message: 'A password introduzida nao e inválida.' });
    }


    res.status(200).json({ message: 'Login bem-sucedido.' });
  } catch (err) {
    console.error('Erro ao realizar login:', err);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
}

module.exports = {
  getAllStudents,
  getStudent,
  signUpStudent,
  loginStudent,
};
