var accounting_data_table = function() {
    return {
        init: function() {				
            /* Extend with date sort plugin */
            $.extend($.fn.dataTableExt.oSort, {
                "date-custom-pre": function ( a ) {
                    var customDate = a.split('/');
                    return (customDate[2] + customDate[1] + customDate[0]) * 1;
                },
                "date-custom-asc": function ( a, b ) {
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                },
                "date-custom-desc": function ( a, b ) {
                    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
                }
            } );

            /* Initialize Bootstrap Datatables Integration */
            App.datatables();
            $("#datasetList").DataTable( {
                columnDefs: [
                    { type: 'date-custom', targets: [4] }
                ],
                processing: true,
	            serverSide: true,
				paging: true,	
				scrollX: true,
				autoWidth: false,
                order: [[ 0, "desc" ]],
                lengthMenu: [[10, 20, 30,50, 70, 100], [10, 20, 30, 50, 70, 100]],
                "footerCallback": function ( row, data, start, end, display ) {
                    var api = this.api(), data;
        
                    // Remove the formatting to get integer data for summation
                    var intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
        
                    // Total over all pages
                    total = 100
        
                    // Total over this page
                    pageTotal = 100
                    
                    //콤마찍기
                    pageTotal = comma(uncomma(pageTotal));
                    total = comma(uncomma(total));

                    // Update footer
                    $( api.column( 6 ).footer() ).html(
                        
                        '합계 : '+pageTotal +' 원 ( 총 합계 : '+ total +' 원 )'
                    );
                }
                
                

            } );
            

            /* Add placeholder attribute to the search input */
            $('.dataTables_filter input').attr('placeholder', '검색');
        }
    };
}();

var outcome = function() {

    return {
        init: function() {
            /* Extend with date sort plugin */
            $.extend($.fn.dataTableExt.oSort, {
                "date-custom-pre": function ( a ) {
                    var customDate = a.split('/');
                    return (customDate[2] + customDate[1] + customDate[0]) * 1;
                },

                "date-custom-asc": function ( a, b ) {
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                },

                "date-custom-desc": function ( a, b ) {
                    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
                }
            } );

            /* Initialize Bootstrap Datatables Integration */
            App.datatables();

            $('#outcome-table').DataTable( {

                columnDefs: [
                    { type: 'date-custom', targets: [1] },                    
                    { orderable: false, targets: [6, 7] }
                ],
                order: [[ 0, "desc" ]],
                pageLength: 20,
                lengthMenu: [[10, 20, 30, -1], [10, 20, 30, 'All']],

                "footerCallback": function ( row, data, start, end, display ) {
                    var api = this.api(), data;
        
                    // Remove the formatting to get integer data for summation
                    var intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
        
                    // Total over all pages
                    total = api
                        .column( 6 )
                        .data()
                        .reduce( function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0 );
        
                    // Total over this page
                    pageTotal = api
                        .column( 6, { page: 'current'} )
                        .data()
                        .reduce( function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0 );
                    
                    //콤마찍기
                    pageTotal = comma(uncomma(pageTotal));
                    total = comma(uncomma(total));

                    // Update footer
                    $( api.column( 6 ).footer() ).html(
                        
                        '합계 : '+pageTotal +' 원 ( 총 합계 : '+ total +' 원 )'
                    );
                }
            } );

           $('#teamTable').dataTable();

            /* Add placeholder attribute to the search input */
            $('.dataTables_filter input').attr('placeholder', '검색');
        }
    };
}();