import prisma from '../../prisma/prismaClient.js';

export const criarRegistro = async (req, res) => {
  try {
    const {
      data,
      tipoDeResiduo,
      quantidadeDeResiduo,
      notas,
      problemas
    } = req.body;

    const userId = req.user.userId;

    // Validação dos campos obrigatórios
    if (
      !data ||
      !tipoDeResiduo ||
      quantidadeDeResiduo === undefined ||
      !notas ||
      !problemas
    ) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const novoRegistro = await prisma.registro.create({
      data: {
        data: new Date(data),
        tipoDeResiduo,
        quantidadeDeResiduo: parseFloat(quantidadeDeResiduo),
        notas,
        problemas,
        user: { connect: { id: userId } }
      }
    });

    return res.status(201).json({ message: "Registro criado com sucesso!", registro: novoRegistro });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar registro." });
  }
};

export const listarRegistros = async (req, res) => {
  try {
    const userId = req.user.userId;
    const registros = await prisma.registro.findMany({
      where: { userId },
      orderBy: { data: 'desc' }
    });
    return res.status(200).json(registros);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar registros." });
  }
};

