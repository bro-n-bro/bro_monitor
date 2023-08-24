<template>
    <div class="block">
        <div class="table_wrap">
            <table>
                <thead>
                    <tr>
                        <th class="alignleft">{{ $t('message.governance_participation_table_label_number') }}</th>
                        <th>{{ $t('message.governance_participation_table_label_account_validator_amount') }}</th>
                        <th>{{ $t('message.governance_participation_table_label_account_amount') }}</th>
                        <th class="alignleft">{{ $t('message.governance_participation_table_label_status') }}</th>
                        <th class="alignleft">{{ $t('message.governance_participation_table_label_vote_power') }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="col_number alignleft">
                            <div><a href="/">#574</a></div>
                        </td>

                        <td class="col_account_validator_amount alignleft">
                           <div>100 000 / 180</div>
                        </td>

                        <td class="col_account_amount">
                            <div>874 244.39</div>
                        </td>

                        <td class="col_status alignleft">
                            <div class="red">{{ $t('message.governance_participation_status_rejected') }}</div>
                        </td>

                        <td class="col_vote_power">
                            <div>100 000</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">
                            <div><a href="/">#875</a></div>
                        </td>

                        <td class="col_account_validator_amount alignleft">
                           <div>98 654 / 124</div>
                        </td>

                        <td class="col_account_amount">
                            <div>874 244.39</div>
                        </td>

                        <td class="col_status alignleft">
                            <div class="green">{{ $t('message.governance_participation_status_passed') }}</div>
                        </td>

                        <td class="col_vote_power">
                            <div>8 447</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>

</script>


<style scoped>
    .block
    {
        overflow: hidden;

        min-height: 0;
        padding: 0;
    }


    .block .table_wrap
    {
        width: 100%;
        margin: 0 0;
    }


    table th
    {
        position: relative;

        padding: 7px 12px;

        white-space: nowrap;
    }


    table .col_number
    {
        width: 160px;
        min-width: 160px;

        table-layout: fixed;
    }

    table .col_account_validator_amount,
    table .col_account_amount
    {
        width: 310px;
        min-width: 310px;

        table-layout: fixed;
    }

    table .col_status
    {
        width: 320px;
        min-width: 320px;

        table-layout: fixed;
    }


    table td
    {
        padding: 7px 12px;

        white-space: nowrap;
    }


    table .col_number a
    {
        color: currentColor;

        display: inline-block;

        vertical-align: top;
    }


    table .col_status .red
    {
        color: #eb5757;
    }

    table .col_status .green
    {
        color: #1bc562;
    }

</style>