define(['app'], function (app) {
    app.config(['$compileProvider', function ($compileProvider) {
        // allow data links
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
    }]);
    app.directive('exportExcel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var data = '';
                var cont = [];
                var csv = {
                    uri: 'data:application/excel;base64,',
                    getTemplate: function () {
                        return '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>'+
                            '<Workbook xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'+
                            '<Worksheet ss:Name="Worksheet" ss:Description="Worksheet"><ss:Table>{table}</ss:Table></Worksheet>'+
                            '</Workbook>';
                    },
                    base64: function (s) {
                        return window.btoa(unescape(encodeURIComponent(s)))
                    },
                    format: function (s, c) {
                        return s.replace(/{(\w+)}/g, function (m, p) {
                            return c[p];
                        })
                    },
                    stringify: function (str) {
                        return str.replace(/^\s\s*/, '').replace(/\s*\s$/, '');
                    },
                    generate: function () {
                        data = '';
                        cont = [];
                        var rows = element.find('tr');
                        angular.forEach(rows, function (row, i) {
                            var tr = angular.element(row),
                                tds = tr.find('th'),
                                rowData = [];
                            if (tr.hasClass('ng-table-filters')) {
                                return;
                            }

//                            console.log(tr, tds);
                            if (tds.length == 0) {
                                tds = tr.find('td');
                            }
//                            if (i != 1) {
                                angular.forEach(tds, function (td, i) {
//                                    console.log(angular.element(td));
                                    rowData.push('<ss:Cell><Data ss:Type="String">'+csv.stringify(angular.element(td).text()) + '</Data></ss:Cell>');
                                });
                                rowData.pop();
//                            }

//                            console.log(rowData);
                            cont.push('<ss:Row>'+rowData.join('') + '</ss:Row>');
                        });
//                        console.log(cont);
                        data = this.base64(this.format(this.getTemplate(), {
                            worksheet: 'Worksheet',
                            table: cont.join('')
                        }));
//                        console.log(data);
                    },
                    link: function () {
                        return this.uri + data;
                    }
                };
                $parse(attrs.exportExcel).assign(scope.$parent, csv);
            }
        };
    }]);
});