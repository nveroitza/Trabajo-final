const app =  new Vue({

    el:'#main',

    data:{
        hostname:'',
        id_host:null,
        id_cliente:null,
        dir_ip:null,
        fecha_carga:null,
        cliente:'',
        razonSocial:'',
        nombre:'',
        apellido:'',
        telefono:null,
        email:'',
        valor_io:null,
        estado_io:null,
        ram_io:null,
        estado_ram_io:null,
        trafico_en:null,
        trafico_sa:null, 
        select_ip:[],
        listar_ip:[],
        indice_guardado:null,
        lista_equipos:[],
        lista_clientes:[]

    },

    methods:{

        capturarcpu_free(){

            const socket = io('http://localhost:3030');
            socket.on('cpu', (data) => {
                this.valor_io = data;

                if(this.valor_io > 0.7)
                {
                    this.estado_io = 'Excedido';
                }else{
                    this.estado_io = 'Normal';
                }

            });
        },
        capturaruso_ram()
        {
            const socket = io('http://localhost:3030');
            socket.on('ram', (usada) => {
                this.ram_io = usada.usedMemMb;
                if(this.ram_io > 2000)
                {
                    this.estado_ram_io = 'Uso excesivo de M.RAM';
                }else{
                    this.estado_ram_io = 'Uso normal de M.RAM';
                }
            });
        },
        trafico()
        {
            const socket = io('http://localhost:3030');
            socket.on('entradaR', (total) => {
                this.trafico_en = total;
            }),
            socket.on('salidaR', (total) => {
                this.trafico_sa = total;
            });
        },
        listarCliente()
        {
            axios.get('http://localhost:3000/clientes').then(resultado => {
                this.lista_clientes = resultado.data;
            });
        },
        listarEquipo()
        {
            axios.get('http://localhost:3000/equipos').then(resultado => {
                
                this.lista_equipos = resultado.data;

            });
        },
        guardarCliente()
        {
            let unCliente = {
                razon_social: this.razonSocial,
                nombre: this.nombre,
                apellido: this.apellido,
                telefono: this.telefono,
                correo_electronico: this.email

            }
            axios.post('http://localhost:3000/clientes',unCliente).then(resultado => {
                
                alert(resultado.data);           
                this.listarCliente();
                this.razonSocial = '';
                this.nombre ='';
                this.apellido ='';
                this.telefono = null;
                this.email =''
            });
        },
        guardarEquipo()
        {
            let unEquipo = {
                hostname: this.hostname,
                dir_ip: this.dir_ip,
                fecha_carga: this.fecha_carga,
                cliente: this.cliente
            }
            axios.post('http://localhost:3000/equipos',unEquipo).then(resultado => {
                
                alert(resultado.data);           
                this.listarEquipo();
                this.hostname = '';
                this.dir_ip = null;
                this.fecha_carga = null;
                this.cliente = ''
            });
        },

        editarEquipo(id_host,hostname,dir_ip,fecha_carga,cliente)
        {
            this.hostname = hostname;
            this.dir_ip = dir_ip;
            this.fecha_carga = fecha_carga;
            this.cliente =cliente;
            this.id_host = id_host;
        },
        actualizarEquipo()
        {
            let unEquipo = {
                hostname: this.hostname,
                dir_ip: this.dir_ip,
                fecha_carga: this.fecha_carga,
                cliente: this.cliente
            }
            console.log(this.id_host);
            axios.put('http://localhost:3000/equipos/'+this.id_host,unEquipo).then(resultado => {
                alert(resultado.data);
                this.listarEquipo();

                this.hostname = '';
                this.dir_ip = null;
                this.fecha_carga = null;
                this.cliente = '';
            });
        },
        editarCliente(id_cliente,razon_social,nombre,apellido,telefono,correo_electronico)
        {
            this.razonSocial = razon_social;
            this.nombre = nombre;
            this.apellido = apellido;
            this.telefono = telefono;
            this.email = correo_electronico;
            this.id_cliente = id_cliente;
        },
        actualizarCliente()
        {
            let unCliente = {
                razon_social: this.razonSocial,
                nombre: this.nombre,
                apellido: this.apellido,
                telefono: this.telefono,
                correo_electronico: this.email

            }
            axios.put('http://localhost:3000/clientes/'+this.id_cliente,unCliente).then(resultado => {
                alert(resultado.data);
                this.listarCliente();

                this.razonSocial = '';
                this.nombre = '';
                this.apellido = '';
                this.telefono = null;
                this.email = '';
            });
        },
        
        
            
        
        eliminarCliente(codigo_cliente)
        {
            axios.delete('http://localhost:3000/clientes/'+codigo_cliente).then( resultado => {
                
                  alert(resultado.data);
                this.listarCliente();

            });
        },

        eliminarEquipo(codigo_index)
        {
            axios.delete('http://localhost:3000/equipos/'+codigo_index).then( resultado => {
                
                  alert(resultado.data);
                this.listarEquipo();

            });
            
        }

    },

    created:function(){
        this.listarCliente();
        this.listarEquipo();
        this.capturarcpu_free();
        this.capturaruso_ram();
        this.trafico();

    },
    
    mounted(){
        $('.tabs').tabs();
    }
    


});