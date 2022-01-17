const request = require('request');
const fs = require('fs');
var express = require('express');
var router = express.Router();
const xlsxFile = require('read-excel-file/node');
function level(valor)
{
   return (valor.toString().split(".").length - 1);
}
function hvSon(row,ind){
  var indi = 0;
  var act = (row[ind][0].toString().split(".").length - 1);
  var inte = ind;
  while (inte < row.length && row[ind][0] ==  row[inte][0])
  {
    inte++;
  } 
  var neu = 0;
  if (inte != row.length)
  {
      neu = (row[inte][0].toString().split(".").length - 1);
      neu = neu -act;
  }
  else 
  {
    neu = 0;
  }
  return neu;
}
module.exports = { 
getHomePage: (req, res, next) => {
  res.render('formulario');
         
},
letItbe: (req,res,next) => {
  var alfa= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var titulo = req.query.titulo;
  var archivo = req.query.archivo;
  console.log('Este es el valor : \n' + titulo +' \n '+ archivo);
  xlsxFile('uploads/'+ archivo).then((rows) => {
   // console.log(rows);
   var dominio = "";
   var subdominio = "";
   var lineas="";
   var valore = 0;
   const buffer = fs.readFileSync("cabecera.txt");
   lineas = buffer;

   lineas=lineas+'<br><br><hr></hr>\n';
   lineas=lineas+'<form action="/procesador" method="get">\n';
   var r2 = 0;
   var r1 = "";
   var n1 = "";
   var j = 0;
   var kl = 0;
   while( rows[j][0]!="1")
   {
    j++;
   }
   var tronador = 0;
   var gr = 0;
   var term = [];
   var swwo = 0;
   var tipo = "";
    for (var iu=j; iu < rows.length; iu ++){
      if (tipo == "") tipo = rows[iu][0];
      if (rows[iu][0]!=null){
        
        if (rows[iu][1]!=null && rows[iu][1]!=dominio )
        { 
          if (tronador == 1)
          {
          lineas = lineas +'</div>\n';
          tronador = 0;
          }
            tipo = rows[iu][0];
            swwo =0;
          dominio = rows[iu][1];
          lineas=lineas+'<br><br><hr>\n';
          lineas=lineas+'<h2><strong>'+dominio+'</strong></h2>\n';
        }
        if (rows[iu][2]!=null && rows[iu][2]!=subdominio ) {
          if (tronador == 1)
          {
          lineas = lineas +'</div>\n';
          tronador = 0;
          }
            tipo = rows[iu][0];
            swwo =0;
          subdominio = rows[iu][2];
          lineas=lineas+'<br><br><hr>\n';
          lineas=lineas+'<h4>'+subdominio+'</h4><hr></hr>\n';
        }
       if (rows[iu][3]!=null)
       { 
         if (valore==1)
         {
           kl=0;
           lineas=lineas+'<br><br><br>\n';
          lineas=lineas+'</fieldset>\n';
          valore =0;
         }
         else valore = 1;
         if (swwo==1 && tipo != rows[iu][0])
          {
            tipo = rows[iu][0];
            swwo = -1;
            gr--;
            tronador = 1;
            lineas = lineas + '<div id="'+ term[gr]+'" style="display:none">';
          }
          if (level(tipo) != level(rows[iu][0]) &&tipo != rows[iu][0] && swwo==-1 )
          {
      
            lineas = lineas +'</div>\n';
            tronador = 0;
            
            tipo = rows[iu][0];
            swwo =0;
          }
         lineas=lineas+'<fieldset style="text-align: start;">\n';
         lineas=lineas+'<legend><strong>'+rows[iu][0]+'</strong>'+rows[iu][3]+'</legend>\n';
         r1 = rows[iu][0];
         var temp = r1+r2;
         if (rows[iu][4].toUpperCase() === 'SI' || rows[iu][4].toUpperCase() === 'NO')
         {
             var funcio ='rt'+r1;
             lineas = lineas +'<div>\n';
             if (rows[iu][4].toUpperCase() === 'SI')
             {
              var nu = hvSon(rows,iu);
              if (nu==1)
              {
                lineas = lineas + '<input type="radio" id="'+temp+'" name="r'+r1+'" onclick="rt(\''+funcio+'\');" value="'+rows[iu][5]+'">\n';
                term[gr]= funcio;
                gr++;
                swwo = 1;
                tipo = rows[iu][0];
              }
              else 
              {
                lineas = lineas + '<input type="radio" id="'+temp+'" name="r'+r1+'"  value="'+rows[iu][5]+'">\n';
            
              }
              
             }
             else 
             {
               if (rows[iu][4].toUpperCase() === 'NO')
               {
                var nu = hvSon(rows,iu);
                if (nu==1)
                {
                  lineas = lineas + '<input type="radio" id="'+temp+'" name="r'+r1+'" onclick="rf(\''+funcio+'\');" value="'+rows[iu][5]+'">\n';
          
                }
                else{
                  lineas = lineas + '<input type="radio" id="'+temp+'" name="r'+r1+'"  value="'+rows[iu][5]+'">\n';
            
                }

               }
             }
            
              lineas = lineas + '<label for="'+r1+'" >'+rows[iu][4]+'</label><br></br>\n';
             lineas = lineas +'</div>\n';
         }
         else
         {
          
          lineas = lineas +'<div>\n';
          r1 = rows[iu][0];
          r2++;
          var temp = r1+r2;
          var temp2 = alfa[kl]+') '+rows[iu][4];
          lineas = lineas + '<input type="checkbox" id="r'+temp+'" name="r'+temp+'"   value="'+rows[iu][5]+'">';
          lineas = lineas + '<label for="'+temp+'" > '+temp2+' </label><br>';        
          lineas = lineas +'</div>\n';
          lineas=lineas+'<br>\n';
          kl++;
        }     
         
        // console.log(rows[iu][0]+"-"+dominio+"-"+subdominio+"-"+rows[iu][3]);
       }
       else{
        if (rows[iu][4].toUpperCase() === 'SI' || rows[iu][4].toUpperCase() === 'NO')
        {
            r1 = rows[iu][0];
            r2++;
            var temp = r1+r2;
            lineas = lineas +'<div>\n';
            if (rows[iu][4].toUpperCase() === 'NO')
            {
                var nu = hvSon(rows,iu);
                if (nu==1)
                {
                  lineas = lineas + '<input type="radio" id="'+temp+'" name="r'+r1+'" onclick="rf(\''+funcio+'\');" value="'+rows[iu][5]+'">\n';
          
                }
                else{
                  lineas = lineas + '<input type="radio" id="'+temp+'" name="r'+r1+'"  value="'+rows[iu][5]+'">\n';
            
                }

             }
             else 
             {
            lineas = lineas + '<input type="radio" id="'+temp+'" name="r'+r1+'"  value="'+rows[iu][5]+'">\n';
             }
            lineas = lineas + '<label for="'+r1+'" >'+rows[iu][4]+'</label><br></br>\n';
            lineas = lineas +'</div>\n';
        }
        else{

            lineas = lineas +'<div>\n';
            r1 = rows[iu][0];
            r2++;
            var temp = r1+r2;
            var temp2 = alfa[kl]+') '+rows[iu][4];
            lineas = lineas + '<input type="checkbox" id="r'+temp+'" name="r'+temp+'"   value="'+rows[iu][5]+'">';
            lineas = lineas + '<label for="'+temp+'" > '+temp2+' </label><br>';        
            lineas = lineas +'</div>\n';
            lineas=lineas+'<br>\n';
            kl++;
        }

       }
      }
    }
    if (valore==1)
         {
          lineas=lineas+'</fieldset>\n';
      //    lineas=lineas+'</form>\n';
          valore =0;
         }
         res.send("Procesando archivo ....");
         const buffer2 = fs.readFileSync("pie.txt");
   lineas = lineas + buffer2;
  fs.writeFile('2pac.html', lineas, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Lyric saved!');
});
   // console.table(rows);
    // let datos = JSON.parse(rows);
   // console.log(datos);
   })
  
  
}

}