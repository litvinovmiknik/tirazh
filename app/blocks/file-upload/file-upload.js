$(function() {
    $('.file-upload__input').on('change', function() {
        let filepath = $(this).val();
        let filename = filepath.replace(/\\/g, "/").split('/').pop();
        $(this).parent().prev().html('Имя файла: ' + filename);
    });
});