<?php
$tables = ['dsdonvi', 'dsdiaban'];
foreach ($tables as $table) {
    echo "Columns for $table:\n";
    $columns = DB::select("SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '$table'");
    foreach ($columns as $column) {
        echo "- {$column->COLUMN_NAME} ({$column->DATA_TYPE})\n";
    }
    echo "\n";
}
