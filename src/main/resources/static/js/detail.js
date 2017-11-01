$('#search-form').on('submit',function(event){
    event.preventDefault();
    var resultText = $(this).find('input').val();
    $('#result-text').text(`'${resultText}' 문서 검색`);

})