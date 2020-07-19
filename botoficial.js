const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

let prefix = config.prefix;

client.on("ready", () => {
    console.log(`Estoy listo!, 
             conectado en ${client.guilds.cache.size} servidores y  ${client.users.cache.size} usuarios.`);
 
    client.user.setPresence( {
        activity: {
            name: `ri/help | Estoy en ${client.guilds.cache.size} servidores, genial no?.`,
            type: "WATCHING"
        },
        status: "online"
     });
 
 });        
 

client.on('message', (message) => {

 let args = message.content.slice(prefix.length).trim().split(' ');  
 let command = args.shift().toLowerCase();
 
 //Bucle Infinito

 if (!message.content.startsWith(prefix)) return; 
 if (message.author.bot) return;
    
 ////////////////////////////////////////////////////////
  
 if(command === 'server') {
  var server = message.guild;
  
  const embed = new Discord.MessageEmbed()
      .setThumbnail(server.iconURL())
      .setAuthor(server.name, server.iconURL())
      .addField('ID', server.id, true)
      .addField('Region', server.region, true)
      .addField('Creado el', server.joinedAt.toDateString(), true)
      .addField('Dueño del Servidor', server.owner.user.tag +'('+server.owner.user.id +')', true)
      .addField('Miembros', server.memberCount, true)
      .addField('Roles', server.roles.size, true)
      .setColor(0x66b3ff)
      
  message.channel.send(embed);
 }
 
 
 
 
 
 
 
 
 
 if(command === 'help') {

 message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');

const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('Server', 'Muestra información de un servidor', true)
    .addField('Ban', 'Banear a un usuario del servidor incluye razon.', true)
    .addField('Kick', 'Expulsar a un usuario del servidor incluye razon.', true)
    .setColor(0x66b3ff)
    
message.author.send(embed);

 }



 if(command === 'ban') {
  let mencionado = message.mentions.users.first();
  let razon = args.slice(1).join(' ');
  
  if(!mencionado) return message.reply('No ha mencionando a ningún miembro.');
  if(!razon) return message.channel.send('Escriba una razón del uso de ban.');
  
  message.guild.members.ban(mencionado, {reason: razon});
  message.channel.send(`**${mencionado.username}**, fue baneado del servidor, razón: ${razon}.`);
  

 }



 if(command === 'md') {
   let mensaje = args.join(" ");


 if(!mensaje) return message.channel.send(`Escriba un mensaje para enviar por privado.`);
 message.author.send(message);

 }
 


 if(command === 'clear') {
   let cantidad = args.join(" ");
   message.channel.bulkDelete(cantidad);

 }




 if(command === 'say') {

let texto = args.join(" ");
if(!texto) return message.channel.send(`Escriba el contenido para enviar.`);
message.channel.send(texto);
};

if(command === 'kick') {

let mencionado = message.mentions.users.first();
let razon = args.slice(1).join(' ');

if(!mencionado) return message.reply(`No ha mencionado a ningún miembro.`);
if(!razon) return message.channel.send(`Escriba una razón.`);

message.guild.member(mencionado).kick(razon);
message.channel.send(`**${mencionado.username}**, fue expulsado del servidor, razón: ${razon}.`);

};



/////////////////////////////////////////////////////////////////////////////////////////////





  if(message.content.startsWith(prefix + 'ayuda')) {
    message.channel.send(`contactar a: Assassin_Richi#3951.`);
  } else
  if(message.content.startsWith(prefix + "comandos")) {
    message.channel.send("Estos son los comandos: say,kick,ayuda")
  } 
  


});

client.login("NzI2MTI4MTA5MTIzNzk3MDYz.XxOnxQ.jqUvMBzicnjLhTXZoTRUCHEmx3w");

