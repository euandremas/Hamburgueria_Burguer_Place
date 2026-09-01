const openapi = {
    openapi: "3.0.3",

    info: {
        title: "Burger Place API",
        version: "1.0.0",
        description:
            "Documentação da API REST do sistema Burger Place, desenvolvida no projeto Projetos e Práticas de Extensão III."
    },

    servers: [
        {
            url: "/",
            description: "Servidor atual"
        }
    ],

    tags: [
        { name: "Health", description: "Verificação de disponibilidade da API" },
        { name: "Autenticação", description: "Registro, login e usuário autenticado" },
        { name: "CEP", description: "Consulta de CEP por integração com a BrasilAPI" },
        { name: "Clientes", description: "Gerenciamento de clientes" },
        { name: "Dashboard", description: "Indicadores e métricas administrativas" },
        { name: "Pedidos", description: "Gerenciamento de pedidos" },
        { name: "Produtos", description: "Gerenciamento do catálogo de produtos" },
        { name: "Usuários", description: "Gerenciamento de usuários administrativos" }
    ],

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Informe o token JWT obtido no login."
            }
        },

        schemas: {
            Error: {
                type: "object",
                properties: {
                    success: {
                        type: "boolean",
                        example: false
                    },
                    error: {
                        type: "object",
                        properties: {
                            code: {
                                type: "string",
                                example: "VALIDATION_ERROR"
                            },
                            message: {
                                type: "string",
                                example: "Dados inválidos."
                            }
                        }
                    }
                }
            },

            User: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    name: { type: "string", example: "Administrador Burger Place" },
                    username: { type: "string", example: "admin" },
                    role: { type: "string", example: "admin" },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2026-08-31T20:00:00.000Z"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2026-08-31T20:00:00.000Z"
                    }
                }
            },

            Product: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    type: { type: "string", example: "Hambúrguer" },
                    name: { type: "string", example: "X-Burger" },
                    description: {
                        type: "string",
                        example: "Hambúrguer com carne, queijo e salada"
                    },
                    price: {
                        type: "string",
                        example: "24.90",
                        description: "Valor decimal armazenado pelo Prisma/PostgreSQL."
                    },
                    imageUrl: {
                        type: "string",
                        nullable: true,
                        example: "img/x-burger.jpg"
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time"
                    }
                }
            },

            ProductInput: {
                type: "object",
                required: ["type", "name", "description", "price"],
                properties: {
                    type: { type: "string", example: "Hambúrguer" },
                    name: { type: "string", example: "X-Burger" },
                    description: {
                        type: "string",
                        example: "Hambúrguer com carne, queijo e salada"
                    },
                    price: {
                        type: "number",
                        format: "float",
                        minimum: 0.01,
                        example: 24.9
                    },
                    imageUrl: {
                        type: "string",
                        nullable: true,
                        example: "img/x-burger.jpg"
                    }
                }
            },

            ProductUpdate: {
                type: "object",
                description:
                    "Atualização parcial. Pelo menos um campo válido deve ser informado.",
                properties: {
                    type: { type: "string", example: "Hambúrguer Especial" },
                    name: { type: "string", example: "X-Burger Especial" },
                    description: {
                        type: "string",
                        example: "Nova descrição do produto"
                    },
                    price: {
                        type: "number",
                        format: "float",
                        minimum: 0.01,
                        example: 29.9
                    },
                    imageUrl: {
                        type: "string",
                        nullable: true,
                        example: "img/x-burger-especial.jpg"
                    }
                }
            },

            Customer: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    name: { type: "string", example: "João Silva" },
                    phone: {
                        type: "string",
                        nullable: true,
                        example: "11999999999"
                    },
                    email: {
                        type: "string",
                        example: "joao@email.com"
                    },
                    zipCode: {
                        type: "string",
                        example: "07800000"
                    },
                    street: {
                        type: "string",
                        example: "Rua Exemplo"
                    },
                    neighborhood: {
                        type: "string",
                        example: "Centro"
                    },
                    city: {
                        type: "string",
                        example: "Franco da Rocha"
                    },
                    state: {
                        type: "string",
                        example: "SP"
                    },
                    number: {
                        type: "string",
                        example: "100"
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time"
                    }
                }
            },

            CustomerInput: {
                type: "object",
                required: [
                    "name",
                    "email",
                    "zipCode",
                    "street",
                    "neighborhood",
                    "city",
                    "state",
                    "number"
                ],
                properties: {
                    name: { type: "string", example: "João Silva" },
                    phone: {
                        type: "string",
                        nullable: true,
                        example: "11999999999"
                    },
                    email: {
                        type: "string",
                        example: "joao@email.com"
                    },
                    zipCode: {
                        type: "string",
                        pattern: "^\\d{8}$",
                        example: "07800000"
                    },
                    street: {
                        type: "string",
                        example: "Rua Exemplo"
                    },
                    neighborhood: {
                        type: "string",
                        example: "Centro"
                    },
                    city: {
                        type: "string",
                        example: "Franco da Rocha"
                    },
                    state: {
                        type: "string",
                        example: "SP"
                    },
                    number: {
                        type: "string",
                        example: "100"
                    }
                }
            },

            OrderItem: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    orderId: { type: "integer", example: 10 },
                    productId: { type: "integer", example: 1 },
                    productName: { type: "string", example: "X-Burger" },
                    unitPrice: { type: "string", example: "24.90" },
                    quantity: { type: "integer", example: 2 }
                }
            },

            OrderItemInput: {
                type: "object",
                required: ["productId"],
                properties: {
                    productId: {
                        type: "integer",
                        example: 1
                    },
                    quantity: {
                        type: "integer",
                        minimum: 1,
                        default: 1,
                        example: 2,
                        description:
                            "Quantidade do produto. O backend também aceita 'qtd' como alias."
                    }
                }
            },

            Order: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 10 },
                    customerId: { type: "integer", example: 1 },
                    status: {
                        type: "string",
                        enum: ["Em preparação", "A caminho", "Entregue"],
                        example: "Em preparação"
                    },
                    etaMin: {
                        type: "integer",
                        example: 20
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time"
                    },
                    customer: {
                        $ref: "#/components/schemas/Customer"
                    },
                    items: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/OrderItem"
                        }
                    },
                    total: {
                        type: "number",
                        format: "float",
                        example: 49.8
                    }
                }
            },

            OrderInput: {
                type: "object",
                required: ["customerId", "items"],
                properties: {
                    customerId: {
                        type: "integer",
                        example: 1
                    },
                    status: {
                        type: "string",
                        enum: ["Em preparação", "A caminho", "Entregue"],
                        default: "Em preparação",
                        example: "Em preparação",
                        description:
                            "Na criação, valores não reconhecidos são substituídos pelo status padrão."
                    },
                    etaMin: {
                        type: "integer",
                        default: 20,
                        example: 20,
                        description:
                            "Tempo estimado em minutos. Valores não positivos usam o padrão de 20 minutos."
                    },
                    items: {
                        type: "array",
                        minItems: 1,
                        items: {
                            $ref: "#/components/schemas/OrderItemInput"
                        }
                    }
                }
            },

            Cep: {
                type: "object",
                properties: {
                    cep: { type: "string", example: "07800000" },
                    street: { type: "string", example: "Rua Exemplo" },
                    neighborhood: { type: "string", example: "Centro" },
                    city: { type: "string", example: "Franco da Rocha" },
                    state: { type: "string", example: "SP" },
                    source: { type: "string", example: "BrasilAPI" }
                }
            },

            Activity: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    type: { type: "string", example: "new" },
                    title: { type: "string", example: "Novo pedido" },
                    subtitle: {
                        type: "string",
                        nullable: true,
                        example: "Cliente: João Silva"
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time"
                    }
                }
            },

            Dashboard: {
                type: "object",
                properties: {
                    totalProducts: { type: "integer", example: 12 },
                    totalCustomers: { type: "integer", example: 8 },
                    totalOrders: { type: "integer", example: 20 },
                    preparingOrders: { type: "integer", example: 4 },
                    onTheWayOrders: { type: "integer", example: 3 },
                    deliveredOrders: { type: "integer", example: 13 },
                    totalRevenue: {
                        type: "number",
                        example: 1850.5
                    },
                    averageTicket: {
                        type: "number",
                        example: 92.53
                    },
                    bestSeller: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "X-Burger" },
                            quantity: { type: "integer", example: 18 }
                        }
                    },
                    topCustomer: {
                        type: "object",
                        properties: {
                            name: { type: "string", example: "João Silva" },
                            orders: { type: "integer", example: 5 }
                        }
                    },
                    topProducts: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "X-Burger" },
                                quantity: { type: "integer", example: 18 }
                            }
                        }
                    },
                    recentActivities: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Activity"
                        }
                    }
                }
            }
        },

        responses: {
            BadRequest: {
                description: "Dados inválidos.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error"
                        },
                        example: {
                            success: false,
                            error: {
                                code: "VALIDATION_ERROR",
                                message: "Dados inválidos."
                            }
                        }
                    }
                }
            },

            Unauthorized: {
                description: "Token ausente, inválido ou expirado.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error"
                        },
                        example: {
                            success: false,
                            error: {
                                code: "TOKEN_MISSING",
                                message: "Token de autenticação não informado."
                            }
                        }
                    }
                }
            },

            NotFound: {
                description: "Recurso não encontrado.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error"
                        },
                        example: {
                            success: false,
                            error: {
                                code: "RESOURCE_NOT_FOUND",
                                message: "Recurso não encontrado."
                            }
                        }
                    }
                }
            },

            Conflict: {
                description: "Conflito com dados existentes.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error"
                        },
                        example: {
                            success: false,
                            error: {
                                code: "CONFLICT",
                                message: "A operação não pode ser concluída."
                            }
                        }
                    }
                }
            },

            InternalServerError: {
                description: "Erro interno do servidor.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error"
                        },
                        example: {
                            success: false,
                            error: {
                                code: "INTERNAL_SERVER_ERROR",
                                message: "Erro interno do servidor."
                            }
                        }
                    }
                }
            }
        }
    },

    paths: {
        "/health": {
            get: {
                tags: ["Health"],
                summary: "Verifica a disponibilidade da API",
                description: "Retorna o estado atual da API Burger Place.",
                responses: {
                    200: {
                        description: "API disponível.",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    message: "Burger Place API online"
                                }
                            }
                        }
                    }
                }
            }
        },

        "/auth/register": {
            post: {
                tags: ["Autenticação"],
                summary: "Registra um usuário",
                description:
                    "Cria um usuário, aplica hash à senha e retorna um token JWT.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "username", "password"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Administrador Burger Place"
                                    },
                                    username: {
                                        type: "string",
                                        example: "admin"
                                    },
                                    password: {
                                        type: "string",
                                        minLength: 6,
                                        example: "123456"
                                    },
                                    role: {
                                        type: "string",
                                        default: "admin",
                                        example: "admin"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário criado com sucesso.",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    data: {
                                        user: {
                                            id: 1,
                                            name: "Administrador Burger Place",
                                            username: "admin",
                                            role: "admin"
                                        },
                                        token: "jwt.token.exemplo"
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    409: { $ref: "#/components/responses/Conflict" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/auth/login": {
            post: {
                tags: ["Autenticação"],
                summary: "Autentica um usuário",
                description:
                    "Valida usuário e senha e retorna um token JWT para acesso às rotas protegidas.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["username", "password"],
                                properties: {
                                    username: {
                                        type: "string",
                                        example: "admin"
                                    },
                                    password: {
                                        type: "string",
                                        example: "123456"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso.",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    data: {
                                        user: {
                                            id: 1,
                                            name: "Administrador Burger Place",
                                            username: "admin",
                                            role: "admin"
                                        },
                                        token: "jwt.token.exemplo"
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: {
                        description: "Credenciais inválidas.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                },
                                example: {
                                    success: false,
                                    error: {
                                        code: "INVALID_CREDENTIALS",
                                        message: "Credenciais inválidas."
                                    }
                                }
                            }
                        }
                    },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/auth/me": {
            get: {
                tags: ["Autenticação"],
                summary: "Retorna o usuário autenticado",
                description:
                    "Obtém os dados do usuário identificado pelo token JWT.",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Usuário autenticado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        data: { $ref: "#/components/schemas/User" }
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/cep/{cep}": {
            get: {
                tags: ["CEP"],
                summary: "Consulta um CEP",
                description:
                    "Consulta um CEP de oito dígitos utilizando a BrasilAPI como fonte de dados.",
                parameters: [
                    {
                        name: "cep",
                        in: "path",
                        required: true,
                        description: "CEP com exatamente oito dígitos.",
                        schema: {
                            type: "string",
                            pattern: "^\\d{8}$",
                            example: "07800000"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "CEP encontrado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Cep" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    404: { $ref: "#/components/responses/NotFound" },
                    502: {
                        description: "Falha na comunicação com a BrasilAPI.",
                        content: {
                            "application/json": {
                                example: {
                                    success: false,
                                    error: {
                                        code: "BRASIL_API_ERROR",
                                        message: "Falha ao consultar a BrasilAPI."
                                    }
                                }
                            }
                        }
                    },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/customers": {
            get: {
                tags: ["Clientes"],
                summary: "Lista clientes",
                description: "Retorna todos os clientes cadastrados.",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Lista de clientes.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/Customer"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            post: {
                tags: ["Clientes"],
                summary: "Cadastra um cliente",
                description:
                    "Cria um cliente após validar nome, e-mail, CEP e endereço completo.",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerInput"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Cliente criado com sucesso.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Customer" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/customers/{id}": {
            get: {
                tags: ["Clientes"],
                summary: "Busca um cliente pelo ID",
                description: "Retorna um cliente específico.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: "Cliente encontrado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Customer" }
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            put: {
                tags: ["Clientes"],
                summary: "Atualiza um cliente",
                description:
                    "Atualiza os dados do cliente. O endereço completo continua obrigatório.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerInput"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Cliente atualizado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Customer" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            delete: {
                tags: ["Clientes"],
                summary: "Remove um cliente",
                description:
                    "Exclui um cliente somente quando não existem pedidos vinculados a ele.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: "Cliente removido.",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    data: {
                                        message: "Cliente removido com sucesso."
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    409: { $ref: "#/components/responses/Conflict" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/dashboard": {
            get: {
                tags: ["Dashboard"],
                summary: "Obtém métricas do dashboard",
                description:
                    "Retorna totais, receita, ticket médio, produtos mais vendidos, cliente destaque e atividades recentes.",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Métricas calculadas com sucesso.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Dashboard" }
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/orders": {
            get: {
                tags: ["Pedidos"],
                summary: "Lista pedidos",
                description:
                    "Retorna os pedidos cadastrados com cliente, itens e valor total calculado.",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Lista de pedidos.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/Order" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            post: {
                tags: ["Pedidos"],
                summary: "Cria um pedido",
                description:
                    "Cria um pedido para um cliente existente contendo ao menos um produto válido.",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/OrderInput" }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Pedido criado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Order" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/orders/{id}": {
            get: {
                tags: ["Pedidos"],
                summary: "Busca um pedido pelo ID",
                description:
                    "Retorna um pedido específico com cliente, itens e valor total.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 10 }
                    }
                ],
                responses: {
                    200: {
                        description: "Pedido encontrado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Order" }
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            delete: {
                tags: ["Pedidos"],
                summary: "Remove um pedido",
                description:
                    "Exclui o pedido e seus itens vinculados por cascade.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 10 }
                    }
                ],
                responses: {
                    200: {
                        description: "Pedido removido.",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    data: {
                                        message: "Pedido removido com sucesso."
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/orders/{id}/status": {
            put: {
                tags: ["Pedidos"],
                summary: "Atualiza o status do pedido",
                description:
                    "Altera o status para Em preparação, A caminho ou Entregue. Pedidos entregues recebem ETA igual a zero.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 10 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["status"],
                                properties: {
                                    status: {
                                        type: "string",
                                        enum: ["Em preparação", "A caminho", "Entregue"],
                                        example: "A caminho"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Status atualizado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Order" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/orders/{id}/eta": {
            put: {
                tags: ["Pedidos"],
                summary: "Atualiza o ETA do pedido",
                description:
                    "Define o tempo estimado do pedido em minutos usando um número inteiro maior ou igual a zero.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 10 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["etaMin"],
                                properties: {
                                    etaMin: {
                                        type: "integer",
                                        minimum: 0,
                                        example: 15
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "ETA atualizado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Order" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/products": {
            get: {
                tags: ["Produtos"],
                summary: "Lista produtos",
                description:
                    "Retorna todos os produtos cadastrados. Esta rota é pública.",
                responses: {
                    200: {
                        description: "Lista de produtos.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/Product" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            post: {
                tags: ["Produtos"],
                summary: "Cadastra um produto",
                description:
                    "Cria um produto com tipo, nome, descrição e preço maior que zero.",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ProductInput" }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Produto criado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Product" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/products/{id}": {
            get: {
                tags: ["Produtos"],
                summary: "Busca um produto pelo ID",
                description: "Retorna um produto específico. Esta rota é pública.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: "Produto encontrado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Product" }
                                    }
                                }
                            }
                        }
                    },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            put: {
                tags: ["Produtos"],
                summary: "Atualiza um produto",
                description:
                    "Atualiza parcialmente um produto existente.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 1 }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ProductUpdate" }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Produto atualizado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/Product" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            delete: {
                tags: ["Produtos"],
                summary: "Remove um produto",
                description:
                    "Exclui um produto quando ele não possui itens de pedidos vinculados.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 1 }
                    }
                ],
                responses: {
                    200: {
                        description: "Produto removido.",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    data: {
                                        message: "Produto removido com sucesso."
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    409: { $ref: "#/components/responses/Conflict" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/users": {
            get: {
                tags: ["Usuários"],
                summary: "Lista usuários",
                description:
                    "Retorna os usuários administrativos sem expor hashes de senha.",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Lista de usuários.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/User" }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            },

            post: {
                tags: ["Usuários"],
                summary: "Cadastra um usuário administrativo",
                description:
                    "Cria um usuário com senha mínima de seis caracteres e armazena somente o hash da senha.",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "username", "password"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Operador Burger Place"
                                    },
                                    username: {
                                        type: "string",
                                        example: "operador"
                                    },
                                    password: {
                                        type: "string",
                                        minLength: 6,
                                        example: "123456"
                                    },
                                    role: {
                                        type: "string",
                                        default: "admin",
                                        example: "admin"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário criado.",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: { $ref: "#/components/schemas/User" }
                                    }
                                }
                            }
                        }
                    },
                    400: { $ref: "#/components/responses/BadRequest" },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        },

        "/users/{id}": {
            delete: {
                tags: ["Usuários"],
                summary: "Remove um usuário",
                description: "Exclui um usuário administrativo pelo ID.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer", example: 2 }
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário removido.",
                        content: {
                            "application/json": {
                                example: {
                                    success: true,
                                    data: {
                                        message: "Usuário removido com sucesso."
                                    }
                                }
                            }
                        }
                    },
                    401: { $ref: "#/components/responses/Unauthorized" },
                    404: { $ref: "#/components/responses/NotFound" },
                    500: { $ref: "#/components/responses/InternalServerError" }
                }
            }
        }
    }
};

module.exports = openapi;