
function salvar() {
    var url = $('#url').val();
    var custom_alias = $('#custom_alias').val();
    if (url == '') {
        alert('Insira o Link');
        return $('#url').focus();
    }
    else if(!isValidUrl(url)) {
        alert('Link inválido');
        document.getElementById('url').value = '';
        return $('#url').focus();
    }
    $('#loader').show();
    $.ajax({
        url: 'http://sisproj.loc/api/encurtar',
        data: {
            url: url,
            custom_alias: custom_alias
        },
        type: 'json',
        method: 'post',
        success: function (r) {
            $('#loader').hide();
            var dados = JSON.stringify(r);
            dados = JSON.parse(dados);
            //console.log(dados);
            if (dados.codigo == 1) {
                document.getElementById('msg').innerHTML = dados.message+' - Tempo de execução: '+dados.statistics.time_taken+' segundo(s)';
                $('#frmcad').each(function () { this.reset(); });
                renderizar(1);
            }
            else if (dados.codigo == 2) {
                document.getElementById('msg').innerHTML = dados.message;
                $('#frmcad').each(function () { this.reset(); });
                renderizar(1);
            }
            else if (dados.codigo == 3) {
                document.getElementById('msg').innerHTML = dados.message;
                $('#frmcad').each(function () { this.reset(); });
                renderizar(1);
            }
            else if (dados.codigo == 4) {
                document.getElementById('msg').innerHTML = dados.message;
                $('#frmcad').each(function () { this.reset(); });
                renderizar(1);
            }
            setTimeout('limpar()', 3000);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById('loading').style.display = 'false';
            for (i in XMLHttpRequest) {
                if (i != "channel")
                    console.log(i + " : " + XMLHttpRequest[i])
            }
        }
    });
}

function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }


function renderizar(param) {
    var path = param == 1 ? 'http://sisproj.loc/api/listar' :  'http://sisproj.loc/api/listarvisitadas';

    document.getElementById('loader').style.display = '';
    $.ajax({
        url: path,
        type: 'json',
        method: 'get',
        success: function (r) {
            document.getElementById('conteudo').innerHTML = '';
            document.getElementById('loader').style.display = 'none';
            var dados = JSON.stringify(r.links);
            dados = JSON.parse(dados);

            //console.log(dados[0].url_original);
            //let res = JSON.parse(r);
            var res = "<table calss='table' width='100%' style='margin: 0% auto; margin-top: 10px;' cellpadding='4' border=1>";
            res += "<thead>";
            res += "    <th style='width: 30%; text-align: center'>Link Original</th>";
            res += "    <th style='width: 30%; text-align: center'>Link Reduzido</th>";
            res += "    <th style='width: 30%; text-align: center'>Custom Alias</th>";
            res += "    <th style='width: 10%; text-align: center'>Nº de Visitas</th>";
            res += "</thead>";
            res += "<tbody>";
            if (dados.length > 0) {
                for (i = 0; i < dados.length; i++) {
                    res += "    <tr style='height: 25px;'>";
                    res += "        <td style='width: 30%; padding-left: 5px'>" + dados[i].url_original + "</td>";
                    res += "        <td style='width: 30%; padding-left: 5px'><a href='" + dados[i].url_original + "' target='_blank'>" + dados[i].url_shortened + "</a></td>";
                    res += "        <td style='width: 30%; padding-left: 5px'>" + dados[i].alias + "</td>";
                    res += "        <td style='width: 10%; text-align: center'>" + dados[i].clicks + "</td>";
                    res += "    </tr>";
                }
            }
            else {
                res += "    <tr>";
                res += "        <td colspan='3' style='text-align: center'>Não há Link(s) cadastrado(s)</td>";
                res += "    </tr>";
            }
            res += "</tbody>";

            res += "  </table>";
            document.getElementById('conteudo').innerHTML = res;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById('loader').style.display = '';
            for (i in XMLHttpRequest) {
                if (i != "channel")
                    console.log(i + " : " + XMLHttpRequest[i])
            }
        }
    });
}

function limpar() {
    document.getElementById('msg').innerHTML = '';
}

window.onload = renderizar(1);
