/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
 
 var i_ID_FT = "";	
var i_trans_type_FT = "";
var i_bene_code_FT = "";
var i_bene_ac_number_FT = "";
var i_instrument_amoun_FT = "";
var i_bene_name_FT = "";
var i_drawee_location_FT = "";
var i_print_location_FT = "";
var i_bene_addr_1_FT = "";
var i_bene_addr_2_FT = "";
var i_bene_addr_3_FT = "";
var i_bene_addr_4_FT = "";
var i_bene_addr_5_FT = "";
var i_instruction_ref_no_FT = "";
var i_customer_ref_no_FT = "";
var i_pay_detail_1_FT = "";
var i_pay_detail_2_FT = "";
var i_pay_detail_3_FT = "";
var i_pay_detail_4_FT = "";
var i_pay_detail_5_FT = "";
var i_pay_detail_6_FT = "";
var i_pay_detail_7_FT = "";
var i_cheque_no_FT = "";
var i_chq_date_FT = "";
var i_micr_no_FT = "";
var i_ifc_code_FT = "";
var i_bene_bank_name_FT = "";
var i_bene_bank_branch_name_FT = "";
var i_bene_email_id_FT = "";
var i_parent_record_FT = "";
var i_base_code_FT = "";
var i_beneficiary_account_type_FT = "";
var i_beneficiary_mobile_number_FT = "";
var i_beneficiary_email_address_1_FT = "";
var i_beneficiary_city_FT = "";
var i_beneficiary_email_address_2_FT = "";
var i_beneficiary_ifsc_code_FT = "";
var i_beneficiary_pin_code_FT = "";
var i_beneficiary_state_FT = "";
var i_cash_discount_FT = "";
var i_corp_email_addr_FT = "";
var i_company_code_FT = "";
var i_corp_batch_no_FT = "";
var i_corporate_code_FT= "";					
var i_debit_account_number_FT = "";				 
var i_invoice_amount_FT = "";
var i_invoice_date_FT= "";
var i_invoice_number_FT = "";
var i_identifier_FT = "";					 
var i_identifier_t_FT = "";					  
var i_net_amount_FT = "";
var i_paytype_FT = "";
var i_payable_location_FT = "";
var i_payment_mode_FT = "";
var i_product_code_FT = "";
var i_transaction_amount_FT = "";
var i_transmission_date_FT = "";
var i_tax_FT = "";
var i_transaction_amount_decimal_FT = "";
var i_user_id_FT = "";
var i_user_department_FT = "";
var i_transaction_currency_FT = "";
var i_value_date_FT = "";
var PAY_TYPE_ARR = {};
var a_transaction_array = new Array();
define(['N/ui/serverWidget','N/search', 'N/runtime', 'N/email','N/format','N/file','N/task','N/sftp','N/record','N/redirect'],

		function(serverWidget,search, runtime, email,format,file,task,sftp,record,redirect) {

	/**
	 * Definition of the Suitelet script trigger point.
	 *
	 * @param {Object} context
	 * @param {ServerRequest} context.request - Encapsulation of the incoming request
	 * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
	 * @Since 2015.2
	 */
	function onRequest(context) {

		try {

			if (context.request.method === 'GET') {
				
				try{
				var request = context.request;
				var response = context.response;
				
				var recordId = context.request.parameters.VENDORPREPAYMENT;
				log.debug('recordId',recordId);
				
				var form = serverWidget.createForm({title: 'Successfully Processed Payment File',hideNavBar: false});
				var return_val = {};
    	try
		{
          var o_contextOBJ = runtime.getCurrentScript();
		  		
		  
		  var recObj = record.load({type:'vendorprepayment',id:recordId,isDynamic:true})
		  var i_vendor=recObj.getValue({fieldId:'entity'})
		  
		  var ID_ARR =           recordId//o_contextOBJ.getParameter({name: 'custscript_id_array'});
		  var USER_ID =          ''//o_contextOBJ.getParameter({name: 'custscript_user_'});
		  var USER_DEPARTMENT =  ''//o_contextOBJ.getParameter({name: 'custscript_user_department_'});
		  var TRANSMISSION_DATE =''//o_contextOBJ.getParameter({name: 'custscript_transmission_date_'});
		  var ACCOUNT =          recObj.getValue({fieldId:'account'})//o_contextOBJ.getParameter({name: 'custscript_account__'});
		  var BANK_METHOD = recObj.getText({fieldId:'custbody_sankara_payment_mode'})  //o_contextOBJ.getParameter({name: 'custscript_bnk_pmt_method__'});
		  log.debug('BANK_METHOD',BANK_METHOD)
		  var NS_ACCOUNT =     ''  //o_contextOBJ.getParameter({name: 'custscript_account__ns'});
		  var AMOUNT_ID_ARRAY = recObj.getValue({fieldId:'payment'})//o_contextOBJ.getParameter({name: 'custscript_amount_id_arr'});
		  var MEMO_MAIN =        recObj.getValue({fieldId:'memo'})//o_contextOBJ.getParameter({name: 'custscript_memo_'});
		 				 
		  if(_logValidation(USER_ID))
		  {
			  var I_USER_ID_SPLIT = USER_ID.split(" ");
			  var I_USER_ID = I_USER_ID_SPLIT[0] ;
		  }
		  else
		  {
			  var I_USER_ID = "";
		  }
		  if(!_logValidation(MEMO_MAIN))
		  {
			MEMO_MAIN = "";  
		  }			  
				  
		  log.debug('getInputData',' ID_ARR  --> '+ID_ARR);
		  log.debug('getInputData',' USER_ID #  --> '+USER_ID);
		  log.debug('getInputData',' USER_STR #  --> '+I_USER_ID);
		  log.debug('getInputData',' USER_DEPARTMENT #  --> '+USER_DEPARTMENT);
		  log.debug('getInputData',' TRANSMISSION_DATE #  --> '+TRANSMISSION_DATE);
		  log.debug('getInputData',' ACCOUNT #  --> '+ACCOUNT);
		  log.debug('getInputData',' BANK_METHOD #  --> '+BANK_METHOD);
		  log.debug('getInputData',' NS_ACCOUNT #  --> '+NS_ACCOUNT);
		  log.debug('getInputData',' AMOUNT_ID_ARRAY #  --> '+AMOUNT_ID_ARRAY);
		  log.debug('getInputData',' AMOUNT_ID_ARRAY JSON #  --> '+JSON.parse(AMOUNT_ID_ARRAY));
		 
		  AMOUNT_ID_ARRAY = JSON.parse(AMOUNT_ID_ARRAY);
		 	 		  
		  ID_ARR = split_data(ID_ARR);
		  log.debug('getInputData',' ######## ID_ARR ########  --> '+ID_ARR);		  
		  				   	
			try
		    {
			var a_filters_GP = new Array();	
			a_filters_GP.push(search.createFilter({name: 'name',operator: search.Operator.IS,values : 'Axis Bank Integration'}));					
					
			var a_columns_GP = new Array();	
			a_columns_GP.push(search.createColumn({name: 'internalid'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_url'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_password'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_password_guid'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_port'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_email_sender'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_email_recipient'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_username'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_host_key_type'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_host_key'}));	    
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_file_name_prefix_1'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_input_directory'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_output_directory'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_reverse_file_download'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_payment_file_upload'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_search_'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_file_date_format'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_initial_file_counter'}));
													
		//	var a_filters_GP = new Array();	
			
			var a_search_results_GP_OBJ = search.create({type: 'customrecord_global_parameters',filters: a_filters_GP,columns: a_columns_GP});
			var a_search_results_GP    = a_search_results_GP_OBJ.run().getRange({start: 0, end: 1000});

			if(_logValidation(a_search_results_GP))
			{
			  var i_recordID_GP = a_search_results_GP[0].getValue({name: 'internalid'});		  
			  var i_email_recipient_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_email_recipient'});
			  var i_email_sender_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_email_sender'});		
			  var i_SFTP_server_URL_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_url'});
			  var i_SFTP_host_key_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_host_key'});
			  var i_SFTP_host_key_type_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_host_key_type'});
			  var i_SFTP_user_name_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_username'});
			  var i_password_guid_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_password_guid'});
			  var i_SFTP_directory_1_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_input_directory'});
			  var i_SFTP_directory_2_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_output_directory'});
			  var i_SFTP_port_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_port'});
			  var i_SFTP_Upload_file_folder = a_search_results_GP[0].getValue({name: 'custrecord_gp_payment_file_upload'});
			  var i_SFTP_Download_file_folder = a_search_results_GP[0].getValue({name: 'custrecord_gp_reverse_file_download'});
			  var i_SFTP_file_prefix_name = a_search_results_GP[0].getValue({name: 'custrecord_gp_file_name_prefix_1'});
			  var i_search_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_search_'});
			  log.audit('i_search_GP',i_search_GP)
			  var i_file_date_format_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_file_date_format'});
			  var i_initial_file_counter_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_initial_file_counter'});
				
		//	  log.debug("get_global_parameters", 'i_recordID_GP -->'+i_recordID_GP);		  
				
			}//Search Results					
		}	
		catch(excsw)
		{
		  log.error("ERROR EXCEPTION", 'excsw -->'+excsw);				
		}
		
		var file_counter = i_initial_file_counter_GP ;
		get_pay_types();			
				
		/////////////// AXIS - TEMPLATE ///////////////////////
						
			var customrecord_yil_file_templateSearchObj = search.create({
				   type: "customrecord_yil_file_template",
				   filters:
				   [				   
				   ],
				   columns:
				   [
					  "internalid",
					  "custrecord_trans_type",
					  "custrecord_bene_code",
					  "custrecord_bene_ac_number",
					  "custrecord_instrument_amount",
					  "custrecord_bene_name",
					  "custrecord_drawee_location",
					  "custrecord_print_location",
					  "custrecord_bene_addr_1",
					  "custrecord_bene_addr_2",
					  "custrecord_bene_addr_3",
					  "custrecord_bene_addr_4",
					  "custrecord_bene_addr_5",
					  "custrecord_instruction_ref_no",
					  "custrecord_customer_ref_no",
					  "custrecord_pay_detail_1",
					  "custrecord_pay_detail_2",
					  "custrecord_pay_detail_3",
					  "custrecord_pay_detail_4",
					  "custrecord_pay_detail_5",
					  "custrecord_pay_detail_6",
					  "custrecord_pay_detail_7",
					  "custrecord_cheque_no",
					  "custrecord_chq_date",
					  "custrecord_micr_no",
					  "custrecord_ifc_code",
					  "custrecord_bene_bank_name",
					  "custrecord_bene_bank_branch_name",
					  "custrecord_bene_email_id",
					  "custrecord_parent_record",
					  "custrecord_base_code",
					  "custrecord_beneficiary_account_type",
					  "custrecord_beneficiary_mobile_number",
					  "custrecord_beneficiary_email_address_1",
					  "custrecord_beneficiary_city",
					  "custrecord_beneficiary_email_address_2",
					  "custrecord_beneficiary_ifsc_code",
					  "custrecord_beneficiary_pin_code",
					  "custrecord_beneficiary_state",
					  "custrecord_cash_discount",
					  "custrecord_corp_email_addr",
					  "custrecord_company_code",
					  "custrecord_corp_batch_no",
					  "custrecord_corporate_code",
					  "created",
					  "custrecord_debit_account_number",
					  "externalid",
					  "custrecord_invoice_amount",
					  "custrecord_invoice_date",
					  "custrecord_invoice_number",
					  "custrecord_identifier",
					  "isinactive",
					  "custrecord_identifier_t",
					  "internalid",
					  "custrecord_net_amount",
					  "custrecord_paytype",
					  "custrecord_payable_location",
					  "custrecord_payment_mode",
					  "custrecord_product_code",
					  "custrecord_transaction_amount",
					  "custrecord_transmission_date",
					  "custrecord_tax",
					  "custrecord_transaction_amount_decimal",
					  "custrecord_user_id",
					  "custrecord_user_department",
					  "custrecord_transaction_currency",
					  "custrecord_value_date"
				   ]
				});
				var searchResultCount = customrecord_yil_file_templateSearchObj.runPaged().count;
				//log.debug("customrecord_yil_file_templateSearchObj result count"+searchResultCount);
				customrecord_yil_file_templateSearchObj.run().each(function(result){
				   // .run().each has a limit of 4,000 results
				   
				      i_ID_FT = result.getValue({name: 'internalid'});	
                   	  i_trans_type_FT = result.getValue({name: 'custrecord_trans_type'});
					  i_bene_code_FT = result.getValue({name: 'custrecord_bene_code'});
					  i_bene_ac_number_FT = result.getValue({name: 'custrecord_bene_ac_number'});
					  i_instrument_amoun_FT = result.getValue({name: 'custrecord_instrument_amount'});
					  i_bene_name_FT = result.getValue({name: 'custrecord_bene_name'});
					  i_drawee_location_FT = result.getValue({name: 'custrecord_drawee_location'});
					  i_print_location_FT = result.getValue({name: 'custrecord_print_location'});
					  i_bene_addr_1_FT = result.getValue({name: 'custrecord_bene_addr_1'});
					  i_bene_addr_2_FT = result.getValue({name: 'custrecord_bene_addr_2'});
					  i_bene_addr_3_FT = result.getValue({name: 'custrecord_bene_addr_3'});
					  i_bene_addr_4_FT = result.getValue({name: 'custrecord_bene_addr_4'});
					  i_bene_addr_5_FT = result.getValue({name: 'custrecord_bene_addr_5'});
					  i_instruction_ref_no_FT = result.getValue({name: 'custrecord_instruction_ref_no'});
					  i_customer_ref_no_FT = result.getValue({name: 'custrecord_customer_ref_no'});
					  i_pay_detail_1_FT = result.getValue({name: 'custrecord_pay_detail_1'});
					  i_pay_detail_2_FT = result.getValue({name: 'custrecord_pay_detail_2'});
					  i_pay_detail_3_FT = result.getValue({name: 'custrecord_pay_detail_3'});
					  i_pay_detail_4_FT = result.getValue({name: 'custrecord_pay_detail_4'});
					  i_pay_detail_5_FT = result.getValue({name: 'custrecord_pay_detail_5'});
					  i_pay_detail_6_FT = result.getValue({name: 'custrecord_pay_detail_6'});
					  i_pay_detail_7_FT = result.getValue({name: 'custrecord_pay_detail_7'});
					  i_cheque_no_FT = result.getValue({name: 'custrecord_cheque_no'});
					  i_chq_date_FT = result.getValue({name: 'custrecord_chq_date'});
					  i_micr_no_FT = result.getValue({name: 'custrecord_micr_no'});
					  i_ifc_code_FT = result.getValue({name: 'custrecord_ifc_code'});
					  i_bene_bank_name_FT = result.getValue({name: 'custrecord_bene_bank_name'});
					  i_bene_bank_branch_name_FT = result.getValue({name: 'custrecord_bene_bank_branch_name'});
					  i_bene_email_id_FT = result.getValue({name: 'custrecord_bene_email_id'});
					  i_parent_record_FT = result.getValue({name: 'custrecord_parent_record'});
					  i_base_code_FT = result.getValue({name: 'custrecord_base_code'});
					  i_beneficiary_account_type_FT = result.getValue({name: 'custrecord_beneficiary_account_type'});
					  i_beneficiary_mobile_number_FT = result.getValue({name: 'custrecord_beneficiary_mobile_number'});
					  i_beneficiary_email_address_1_FT = result.getValue({name: 'custrecord_beneficiary_email_address_1'});
					  i_beneficiary_city_FT = result.getValue({name: 'custrecord_beneficiary_city'});
					  i_beneficiary_email_address_2_FT = result.getValue({name: 'custrecord_beneficiary_email_address_2'});
					  i_beneficiary_ifsc_code_FT = result.getValue({name: 'custrecord_beneficiary_ifsc_code'});
					  i_beneficiary_pin_code_FT = result.getValue({name: 'custrecord_beneficiary_pin_code'});
					  i_beneficiary_state_FT = result.getValue({name: 'custrecord_beneficiary_state'});
					  i_cash_discount_FT = result.getValue({name: 'custrecord_cash_discount'});
					  i_corp_email_addr_FT = result.getValue({name: 'custrecord_corp_email_addr'});
					  i_company_code_FT = result.getValue({name: 'custrecord_company_code'});
					  i_corp_batch_no_FT = result.getValue({name: 'custrecord_corp_batch_no'});
					  i_corporate_code_FT = result.getValue({name: 'custrecord_corporate_code'});					
					  i_debit_account_number_FT = result.getValue({name: 'custrecord_debit_account_number'});					 
					  i_invoice_amount_FT = result.getValue({name: 'custrecord_invoice_amount'});
					  i_invoice_date_FT = result.getValue({name: 'custrecord_invoice_date'});
					  i_invoice_number_FT = result.getValue({name: 'custrecord_invoice_number'});
					  i_identifier_FT = result.getValue({name: 'custrecord_identifier'});					 
					  i_identifier_t_FT = result.getValue({name: 'custrecord_identifier_t'});					  
					  i_net_amount_FT = result.getValue({name: 'custrecord_net_amount'});
					  i_paytype_FT = result.getValue({name: 'custrecord_paytype'});
					  i_payable_location_FT = result.getValue({name: 'custrecord_payable_location'});
					  i_payment_mode_FT = result.getValue({name: 'custrecord_payment_mode'});
					  i_product_code_FT = result.getValue({name: 'custrecord_product_code'});
					  i_transaction_amount_FT = result.getValue({name: 'custrecord_transaction_amount'});
					  i_transmission_date_FT = result.getValue({name: 'custrecord_transmission_date'});
					  i_tax_FT = result.getValue({name: 'custrecord_tax'});
					  i_transaction_amount_decimal_FT = result.getValue({name: 'custrecord_transaction_amount_decimal'});
					  i_user_id_FT = result.getValue({name: 'custrecord_user_id'});
					  i_user_department_FT = result.getValue({name: 'custrecord_user_department'});
					  i_transaction_currency_FT = result.getValue({name: 'custrecord_transaction_currency'});
					  i_value_date_FT = result.getValue({name: 'custrecord_value_date'});
					   				   
				   return true;
				});
				
            var d_todays_date = new Date();
			d_todays_date     = convert_date(d_todays_date);
			var d_todays_date_STR = append_zero_in_date(d_todays_date , i_file_date_format_GP);
			log.debug('schedulerFunction', ' Todays Date  -->' + d_todays_date);
			
			var i_payment_file_sequence = get_payment_no(file_counter);
			log.debug('schedulerFunction', ' i_payment_file_sequence -->' + i_payment_file_sequence);
			
			var i_payment_file_sequence = get_file_counter_no(file_counter);
			log.debug('schedulerFunction', ' i_payment_file_sequence_X -->' + i_payment_file_sequence);
			
		//	update_file()
			
            var s_timestamp       = d_todays_date.getTime();			
			var d_date_DAY        = d_todays_date.getDate(); 
			var d_date_MONTH      = d_todays_date.getMonth()+ 1;
			var d_date_YEAR       = d_todays_date.getFullYear();
			var d_date_TIME       = d_todays_date.getHours()+'-'+d_todays_date.getMinutes()+'-'+d_todays_date.getSeconds();
				
			var a_filters = new Array();
			
           if(/*_logValidation(i_search_GP) && */_logValidation(ID_ARR)) 
			{			
			   a_filters.push(search.createFilter({name: 'internalid',operator: search.Operator.ANYOF,values:i_vendor}));
					
					log.debug('a_filters',a_filters)
				var search_OBJ = search.load({id:'customsearch2473'})//({id:'customsearch2476'})//({id: 'customsearch2473'});

				if(_logValidation(a_filters)) {
					for(var idx = 0; idx < a_filters.length; idx++) {
						search_OBJ.filters.push(a_filters[idx]);
					}
				}
				var a_search_results = search_OBJ.run().getRange({start: 0,end: 1000});
				log.debug('schedulerFunction', ' AXIS to NS Search Results  -->' + a_search_results);

				var counter = 0;
				var file_str = "";
			  
				if(_logValidation(a_search_results)) 
				{
					
					for(var i = 0; i < a_search_results.length; i++){
						// .run().each has a limit of 4,000 results
						var i_recordID = recordId//recObj.getValue({fieldId: "internalid"});
						log.debug(' ****** Record ID ****** '+i_recordID);
						
						try
						{
							var i_AMT_TO_PAID_ = AMOUNT_ID_ARRAY//[i_recordID].amount_to_be_paid ; 
						}
						catch(excss)
						{
							var i_AMT_TO_PAID_ = 0 ;
						}						
						
						var i_ref_code = recObj.getValue({fieldId: "custbody_seh_invoice_number"});
						log.debug(' ****** Ref Code ****** '+i_ref_code);
						
						var i_ref_code_OTHER = recObj.getValue({fieldId: "transactionnumber"});
						log.debug(' ****** i_ref_code_OTHER ****** '+i_ref_code_OTHER);
												
						a_transaction_array.push(i_recordID);
						
						var s_record_type = 'vendorprepayment'//a_search_results[i].getValue({name: "recordtype"});
						log.debug(' ****** Record Type ****** '+s_record_type);
						
						if(s_record_type == 'vendorprepayment')
						{
							i_ref_code = i_ref_code_OTHER ;
						}
						
						 var d_todays_date_NEW = new Date();
			             d_todays_date_NEW     = convert_date(d_todays_date_NEW);
						 var s_timestamp       = d_todays_date_NEW.getTime();	
						 
						var corp_code ="DEMOCORP362";
						var i_customer_ref_no = i_recordID+''+s_timestamp ;
												
						var bank_payment_STR = BANK_METHOD //a_search_results[i].getText({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** Bank Payment ****** '+bank_payment_STR);
						log.debug(' ****** Bank i_trans_type_FT ****** '+i_trans_type_FT);
						
						if(!_logValidation(bank_payment_STR)){var bank_payment = "";}
						else
						{
							var bank_payment = bank_payment_STR.substring(0,i_payment_mode_FT)
						}
						log.debug(' ****** Bank Payment ****** '+bank_payment);
						
						var debit_account_no = ACCOUNT //a_search_results[i].getValue({name: "accountnumber",join: "vendor"});
						log.debug(' ****** Debit Account No. ****** '+debit_account_no);
						
						//debit_account_no = "913020037445321" ;
												
						if(!_logValidation(debit_account_no)){debit_account_no = "";}else{debit_account_no  = debit_account_no.substring(0,i_bene_code_FT)}
						
						var d_date_r = new Date();
						d_date_r = convert_date(d_date_r);
						
						var value_date =  d_date_r ;//a_search_results[i].getValue({name: "duedate"});
						log.debug(' ****** Value Date ****** '+value_date);
						
						value_date = append_zero_in_date(value_date , i_value_date_FT)
						
						if(!_logValidation(value_date)){value_date = "";}
						
						var tran_currency = recObj.getText({fieldId: "currency"});
						log.debug(' ****** tran_currency ****** '+tran_currency);
						
						if(!_logValidation(tran_currency)){tran_currency = "";}
						
						tran_currency = tran_currency.substring(0,i_transaction_currency_FT)
						
						var tran_amount = i_AMT_TO_PAID_ //a_search_results[i].getValue({name: "amount"});
						log.debug(' ****** tran_amount ****** '+tran_amount);
					//	tran_amount = Math.abs(tran_amount);
						log.debug(' ****** A tran_amount ****** '+tran_amount);
							
						if(!_logValidation(tran_amount)){tran_amount = "";}
						
						tran_amount = amount_formatting(tran_amount , i_transaction_amount_FT)
						log.debug(' ****** B tran_amount ****** '+tran_amount);
											
						var benificiary_name = a_search_results[0].getValue({name: "custentitysankara_beneficiaryname"});
						log.debug(' ****** benificiary_name ****** '+benificiary_name);
						
						if(!_logValidation(benificiary_name)){benificiary_name = "";}
						
						benificiary_name = benificiary_name.substring(0,i_bene_name_FT)						
						
						var benificiary_code = a_search_results[0].getValue({name: "entityid",
         sort: search.Sort.ASC,
         label: "ID"});//a_search_results[0].getValue({name: "custentitysankara_beneficiary_code"});
						log.debug(' ****** benificiary_code ****** '+benificiary_code);
						
						if(!_logValidation(benificiary_code)){benificiary_code = "";}
						benificiary_code = benificiary_code.substring(0,i_bene_code_FT)
						
						var benificiary_account_no = a_search_results[0].getValue({name: "custentity_seh_bank_account_number"});
						log.debug(' ****** benificiary_account_no ****** '+benificiary_account_no);
												
						if(!_logValidation(benificiary_account_no)){benificiary_account_no = "";}
						benificiary_account_no = benificiary_account_no.substring(0,i_bene_ac_number_FT)
						
						var benificiary_account_type = a_search_results[0].getText({name: "custentitysankara_beneficiary_account_ty"});
						log.debug(' ****** benificiary_account_type ****** '+benificiary_account_type);
						
						if(!_logValidation(benificiary_account_type)){benificiary_account_type = "";}
						benificiary_account_type = benificiary_account_type.substring(0,i_beneficiary_account_type_FT)
												
						var benificiary_address_1 = a_search_results[0].getValue({name: "address1"});
						log.debug(' ****** benificiary_address_1 ****** '+benificiary_address_1);
						
						if(!_logValidation(benificiary_address_1)){benificiary_address_1 = "";}
						benificiary_address_1 = benificiary_address_1.substring(0,i_bene_addr_1_FT)
						
						var benificiary_address_2 = a_search_results[0].getValue({name: "address2"});
						log.debug(' ****** benificiary_address_2 ****** '+benificiary_address_2);
						
						if(!_logValidation(benificiary_address_2)){benificiary_address_2 = "";}
						benificiary_address_2 = benificiary_address_2.substring(0,i_bene_addr_2_FT)
						
						var benificiary_address_3 = a_search_results[0].getValue({name: "address3"});
						log.debug(' ****** benificiary_address_3 ****** '+benificiary_address_3);
						
						if(!_logValidation(benificiary_address_3)){benificiary_address_3 = "";}
						benificiary_address_3 = benificiary_address_3.substring(0,i_bene_addr_3_FT)
						
						var benificiary_city = a_search_results[0].getValue({name: "city"});
						log.debug(' ****** benificiary_city ****** '+benificiary_city);
						
						if(!_logValidation(benificiary_city)){benificiary_city = "";}
						benificiary_city = benificiary_city.substring(0,i_beneficiary_city_FT)
						
						var benificiary_state = a_search_results[0].getValue({name: "state"});
						log.debug(' ****** benificiary_state ****** '+benificiary_state);
						
						if(!_logValidation(benificiary_state)){benificiary_state = "";}
						benificiary_state = benificiary_state.substring(0,i_beneficiary_state_FT)
					
						var benificiary_pin = a_search_results[0].getValue({name: "zipcode"});
						log.debug(' ****** benificiary_pin ****** '+benificiary_pin);
						
						if(!_logValidation(benificiary_pin)){benificiary_pin = "";}
						benificiary_pin = benificiary_pin.substring(0,i_beneficiary_pin_code_FT)
					
						var Beneficiary_IFSC_Code= a_search_results[0].getValue({name: "custentity_sankara_ifsc_code"});
						log.debug(' ****** Beneficiary_IFSC_Code ****** '+Beneficiary_IFSC_Code);
						
						if(!_logValidation(Beneficiary_IFSC_Code)){Beneficiary_IFSC_Code = "";}
						Beneficiary_IFSC_Code = Beneficiary_IFSC_Code.substring(0,i_beneficiary_ifsc_code_FT)
					
						var Beneficiary_Bank_Name= a_search_results[0].getValue({name: "custentitysankara_bankname"});
						log.debug(' ****** Beneficiary_Bank_Name ****** '+Beneficiary_Bank_Name);

                        if(!_logValidation(Beneficiary_Bank_Name)){Beneficiary_Bank_Name = "";}
						Beneficiary_Bank_Name = Beneficiary_Bank_Name.substring(0,i_bene_bank_name_FT)
					
						var Base_Code= "";//a_search_results[i].getValue({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** Base_Code ****** '+Base_Code);

                         if(!_logValidation(Base_Code)){Base_Code = "";}
						
						var Cheque_Number= ""; //a_search_results[i].getValue({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** Cheque_Number ****** '+Cheque_Number);
                        
						if(!_logValidation(Cheque_Number)){Cheque_Number = "";}
						 
						var Cheque_Date= ""; //a_search_results[i].getValue({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** Cheque_Date ****** '+Cheque_Date);
						
						Cheque_Date = append_zero_in_date(Cheque_Date , i_chq_date_FT)
												
						if(!_logValidation(Cheque_Date)){Cheque_Date = "";}
												
						var payable_location= ""; //a_search_results[i].getValue({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** payable_location ****** '+payable_location);

						var Print_Location= ""; // a_search_results[i].getValue({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** Print_Location ****** '+Print_Location);
          
		                if(!_logValidation(Print_Location)){Print_Location = "";}
						
						var Beneficiary_Email_address_1= a_search_results[0].getValue({name: "email"});
						log.debug(' ****** Beneficiary_Email_address_1 ****** '+Beneficiary_Email_address_1);
                        
						if(!_logValidation(Beneficiary_Email_address_1)){Beneficiary_Email_address_1 = "";}
						Beneficiary_Email_address_1 = Beneficiary_Email_address_1.substring(0,i_beneficiary_email_address_1_FT)
											
						var Beneficiary_Email_address_2= a_search_results[0].getValue({name: "email"});
						log.debug(' ****** Beneficiary_Email_address_2 ****** '+Beneficiary_Email_address_2);

                        if(!_logValidation(Beneficiary_Email_address_2)){Beneficiary_Email_address_2 = "";}
						Beneficiary_Email_address_2 = Beneficiary_Email_address_2.substring(0,i_beneficiary_email_address_2_FT)
						
						var Beneficiary_Mobile_Number= a_search_results[0].getValue({name: "phone"});
						log.debug(' ****** Beneficiary_Mobile_Number ****** '+Beneficiary_Mobile_Number);

                        if(!_logValidation(Beneficiary_Mobile_Number)){Beneficiary_Mobile_Number = "";}
						Beneficiary_Mobile_Number = Beneficiary_Mobile_Number.substring(0,i_beneficiary_mobile_number_FT)
						
						var Corp_Batch_No= ""; // a_search_results[i].getValue({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** Corp_Batch_No ****** '+Corp_Batch_No);
                        
						if(!_logValidation(Corp_Batch_No)){Corp_Batch_No = "";}
						
						var Company_Code= "";//a_search_results[i].getValue({name: "subsidiary"});
						log.debug(' ****** Company_Code ****** '+Company_Code);
                        
						if(!_logValidation(Company_Code)){Company_Code = "";}
						 
						var Product_Code= ""; //a_search_results[i].getValue({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** Product_Code ****** '+Product_Code);
						
						if(!_logValidation(Product_Code)){Product_Code = "";}
						
						var Extra_1= "";
						log.debug(' ****** Extra_1 ****** '+Extra_1);
						
						if(!_logValidation(Extra_1)){Extra_1 = "";}
												
						var Extra_2= "";
						log.debug(' ****** Extra_2 ****** '+Extra_2);
						
						if(!_logValidation(Extra_2)){Extra_2 = "";}
												
						var Extra_3= "";
						log.debug(' ****** Extra_3 ****** '+Extra_3);
						
						if(!_logValidation(Extra_3)){Extra_3 = "";}
												
						var Extra_4= "";
						log.debug(' ****** Extra_4 ****** '+Extra_4);
						
						if(!_logValidation(Extra_4)){Extra_4 = "";}
												
						var Extra_5= "";
						log.debug(' ****** Extra_5 ****** '+Extra_5);
						
						if(!_logValidation(Extra_5)){Extra_5 = "";}
												
					//	var PayType =  a_search_results[i].getValue({name: "custbody_bank_pay_type"});
					//	log.debug(' ****** PayType ****** '+PayType);
						
					//	if(!_logValidation(PayType)){PayType = "";}
						
						var CORP_EMAIL_ADDR= ""//a_search_results[i].getValue({name: "email",join: "vendor"});
						log.debug(' ****** CORP_EMAIL_ADDR ****** '+CORP_EMAIL_ADDR);
						
						if(!_logValidation(CORP_EMAIL_ADDR)){CORP_EMAIL_ADDR = "";}
						CORP_EMAIL_ADDR = CORP_EMAIL_ADDR.substring(0,i_corp_email_addr_FT)
																		
						var TRANSMISSION_DATE= TRANSMISSION_DATE; 
						log.debug(' ****** TRANSMISSION_DATE ****** '+TRANSMISSION_DATE);
						
						if(!_logValidation(TRANSMISSION_DATE)){TRANSMISSION_DATE = "";}
											  			
						var User_ID =  I_USER_ID; 
						log.debug(' ****** User_ID ****** '+User_ID);
						
						if(!_logValidation(User_ID)){User_ID = "";}
						User_ID = User_ID.substring(0,i_user_id_FT)
												
						var USER_DEPARTMENT = USER_DEPARTMENT; 
						log.debug(' ****** USER_DEPARTMENT ****** '+USER_DEPARTMENT);
						
						if(!_logValidation(USER_DEPARTMENT)){USER_DEPARTMENT = "";}
						USER_DEPARTMENT = USER_DEPARTMENT.substring(0,i_user_department_FT)
												
						var Field_Name= "";//a_search_results[i].getValue({name: "custbody_se_bnk_paymt_method"});
						log.debug(' ****** Field_Name ****** '+Field_Name);
						if(!_logValidation(Field_Name)){Field_Name = "";}
																		    
						var INVOICE_NUMBER = i_ref_code ; //a_search_results[i].getValue({name: "custbody_seh_invoice_number"});
						log.debug(' ****** INVOICE_NUMBER ****** '+INVOICE_NUMBER);
						if(!_logValidation(INVOICE_NUMBER)){INVOICE_NUMBER = "";}
						INVOICE_NUMBER = INVOICE_NUMBER.substring(0,i_invoice_number_FT)
						
						var INVOICE_DATE= recObj.getValue({fieldId: "trandate"});
						log.debug(' ****** INVOICE_DATE ****** '+INVOICE_DATE);
						if(!_logValidation(INVOICE_DATE)){INVOICE_DATE = "";}
						
						INVOICE_DATE = append_zero_in_date(INVOICE_DATE , i_invoice_date_FT)
												
						var NET_AMOUNT= recObj.getValue({fieldId: "total"});
						log.debug(' ****** NET_AMOUNT ****** '+NET_AMOUNT);
						
					//	NET_AMOUNT = Math.abs(NET_AMOUNT);
						log.debug(' ****** B NET_AMOUNT ****** '+NET_AMOUNT);
											
						NET_AMOUNT = amount_formatting(NET_AMOUNT , i_net_amount_FT)
						if(!_logValidation(NET_AMOUNT)){NET_AMOUNT = '0.0';}
						log.debug(' ****** C NET_AMOUNT ****** '+NET_AMOUNT);
									   
						var TAX= recObj.getValue({fieldId: "custbody_sankara_tds_amount"});
						if(!_logValidation(TAX)){TAX='0.0'}
						log.debug(' ****** TAX ****** '+TAX);
						
						TAX = amount_formatting(TAX , i_tax_FT)
					    if(!_logValidation(TAX)){TAX = '0.0';}
							
						var CASH_DISCOUNT= recObj.getValue({fieldId: "discountamount"});
						
						if(!_logValidation(CASH_DISCOUNT)){CASH_DISCOUNT='0.0'}
						log.debug(' ****** CASH_DISCOUNT ****** '+CASH_DISCOUNT);
					    CASH_DISCOUNT = amount_formatting(CASH_DISCOUNT , i_cash_discount_FT)
					    if(!_logValidation(CASH_DISCOUNT)){CASH_DISCOUNT = '0.0';}
					   
						var INVOICE_AMOUNT= i_AMT_TO_PAID_ //a_search_results[i].getValue({name: "custbody_seh_inv_total_amount"});
						log.debug(' ****** INVOICE_AMOUNT ****** '+INVOICE_AMOUNT);
						
					//	INVOICE_AMOUNT = Math.abs(INVOICE_AMOUNT);
												
						INVOICE_AMOUNT = amount_formatting(INVOICE_AMOUNT , i_invoice_amount_FT)
						if(!_logValidation(INVOICE_AMOUNT)){INVOICE_AMOUNT = '0.0';}
						
						
						var i_TOTAL_AMOUNT = parseFloat(INVOICE_AMOUNT) + parseFloat(TAX);
						log.debug(' ****** i_TOTAL_AMOUNT ****** '+i_TOTAL_AMOUNT);
						
							if(!_logValidation(i_TOTAL_AMOUNT)){i_TOTAL_AMOUNT = '0.0';}
						log.debug(' ****** C i_TOTAL_AMOUNT ****** '+i_TOTAL_AMOUNT);
						
						log.debug(' ****** PAY_TYPE_ARR ****** '+JSON.stringify(PAY_TYPE_ARR));
						
					    try
						{						
							var PAY_TYPE = PAY_TYPE_ARR[s_record_type].paytype ;
						}
						catch(excsd)
						{		
						   var PAY_TYPE = "";
						}
						log.debug(' ****** PAY_TYPE ****** '+PAY_TYPE);
																	
						var line_str = "";
					
						file_str += i_identifier_FT+ "^" + 
						bank_payment+ "^" + 
						corp_code+ "^" +
						i_customer_ref_no+ "^" +
						debit_account_no+ "^" +
						value_date+ "^" +
						tran_currency+ "^" +
						tran_amount+ "^" +
						benificiary_name+ "^" +
						benificiary_code+ "^" +
						benificiary_account_no+ "^" +
						benificiary_account_type+ "^" +
						""+'^'+
						""+'^'+
						""+'^'+
						benificiary_city+ "^" +
						benificiary_state+ "^" +
						benificiary_pin+ "^" +
						Beneficiary_IFSC_Code+ "^" +
						Beneficiary_Bank_Name+ "^" +
						Base_Code+ "^" +
						Cheque_Number+ "^" +
						Cheque_Date+ "^" +
						payable_location+ "^" +
						Print_Location+ "^" +
						Beneficiary_Email_address_1+ "^" +
						Beneficiary_Email_address_2+ "^" +
						Beneficiary_Mobile_Number+ "^" +
						Corp_Batch_No+ "^" +
						Company_Code+ "^" +
						Product_Code+ "^" +
						Extra_1+ "^" +
						Extra_2+ "^" +
						Extra_3+ "^" +
						Extra_4+ "^" +
						Extra_5+ "^" +
						PAY_TYPE+ "^" +
						CORP_EMAIL_ADDR+ "^" +
						TRANSMISSION_DATE+ "^" +
						User_ID+ "^" +
						USER_DEPARTMENT+ "^" +
						MEMO_MAIN+ "^" +
						Field_Name+ "^" +
						Field_Name+ "^" +
						Field_Name+ "^" +
						Field_Name+"\n"
						
						line_str = i_identifier_t_FT+ "^" +
						INVOICE_NUMBER+ "^" +
						INVOICE_DATE+ "^" +
				        INVOICE_AMOUNT		+ "^" +
						TAX+ "^" +
						CASH_DISCOUNT+ "^" +
						i_TOTAL_AMOUNT
						
						file_str = file_str+line_str +"\n"; 

                        return_val[i_recordID] = {"vb_amt_paid":i_AMT_TO_PAID_ , "vb_recordtype": s_record_type, "vb_id" : i_recordID ,"vb_customer_ref_no" : i_customer_ref_no , "vb_account" : NS_ACCOUNT , "vb_bank_method" : BANK_METHOD,"vb_timestamp":s_timestamp};
						
					}								
					
					var file_name = i_SFTP_file_prefix_name+""+d_todays_date_STR+""+i_payment_file_sequence ;
					var o_file = file.create({
					name: file_name+".txt",
					fileType: file.Type.PLAINTEXT,
					contents: file_str,
					folder: i_SFTP_Upload_file_folder
					});
					
					var i_file_id = o_file.save();
					log.debug("****** File ID ********" + i_file_id);

					//return true;
				} 			
			}
			
			/////////////// SFTP CONNECTION - UPLOAD /////////////////
			var success_fail_flag = false;	
			try
			{			
			var o_connectionOBJ = sftp.createConnection({
		             username     : i_SFTP_user_name_GP,
		             passwordGuid : '85969ece62b14b998fde111ba40bc488',//i_password_guid_GP,
					 hostKey      : i_SFTP_host_key_GP,
		             hostKeyType  : i_SFTP_host_key_type_GP,
		             url          : i_SFTP_server_URL_GP
		            
			 });
			log.debug('schedulerFunction', 'Connection  -->'+o_connectionOBJ); 
						
			
				var o_uploadOBJ = o_connectionOBJ.upload({
					directory: i_SFTP_directory_1_GP,
					filename: file_name+".txt",
					file: o_file,
					replaceExisting: false
				});
				log.debug("o_uploadOBJ -->"+o_uploadOBJ);
				success_fail_flag = true;
			}
			catch(exqw)
			{
				log.error(" Exception Caught -->"+exqw);
                success_fail_flag = false ;	
				createError(serverWidget,exqw.message,response)
				
			}
			var name_str = "Axis_Integration_"+file_name; 
			
			a_transaction_array = remove_duplicates(a_transaction_array);
			
		create_logs(name_str,I_USER_ID,d_todays_date,d_date_TIME , success_fail_flag ,i_file_id ,i_payment_file_sequence ,file_name ,a_transaction_array);	
	//	update_processed(a_transaction_array)   				  
	
    	}
    	catch(ex){
    		log.error("ERROR",'Exception '+ex);	
							createError(serverWidget,ex.message,response)
    	}
		
		log.audit('return_val',return_val)
		var key = return_val[recordId]
		log.audit('key',key)
		if(_logValidation(recordId) && _logValidation(key))
		   {
			   var recordtype =  return_val[recordId].vb_recordtype			  
			   var bank_account_X = return_val[recordId].vb_account
			   var bank_method_type_X =  return_val[recordId].vb_bank_method
			   var bank_amount_X = return_val[recordId].vb_amt_paid ;
			   var vb_customer_ref_no = return_val[recordId].vb_customer_ref_no ;
			   var vb_timestamp = return_val[recordId].vb_timestamp ;
			   
			    log.debug("map", 'bank_account_X -->'+bank_account_X);
			    log.debug("map", 'bank_method_type_X -->'+bank_method_type_X);
				
				if(bank_method_type_X == 'NEFT')
				{
					bank_method_type_X = 10;
				}
				else if(bank_method_type_X == "RTGS")
				{
					bank_method_type_X = 14;
				}
				
				
				  try
				   {					
					  if(_logValidation(recordId))
					  {
							var i_VB_submitID = record.submitFields({type: 'vendorprepayment',id: recordId, 
							values: {  	    
									custbody_seh_hold_payment_done_: true				
							},
							options: {enableSourcing: true,ignoreMandatoryFields : true}}); 
							log.audit('createi_VP_submitID',' VB_submitID -->'+i_VB_submitID); 
							
							
							  try
							  {
								var o_BD_OBJ = record.create({type : 'customrecord_seh_bank_detail_',isDynamic : true});
								//o_BD_OBJ.setValue({ fieldId: 'name', value: recName});
								if(_logValidation(bank_method_type_X)){
								o_BD_OBJ.setValue({fieldId: 'custrecord_seh_bank_payment_method_',value: bank_method_type_X,ignoreFieldChange: false}); 
								}
								o_BD_OBJ.setValue({fieldId: 'custrecord_seh_is_bank_payment_initiated',value: true,ignoreFieldChange: false});
								o_BD_OBJ.setValue({fieldId: 'custrecord_seh_from_bank_account_',value: bank_account_X,ignoreFieldChange: false});
								o_BD_OBJ.setValue({fieldId: 'custrecord_seh_bill_vendor_prepayment_',value: recordId,ignoreFieldChange: false});
								o_BD_OBJ.setValue({fieldId: 'custrecord_seh_bank_payment_amount_',value: bank_amount_X,ignoreFieldChange: false});
								o_BD_OBJ.setValue({fieldId: 'custrecord_seh_file_unique_ref_no',value: vb_customer_ref_no,ignoreFieldChange: false});
								o_BD_OBJ.setValue({fieldId: 'custrecord_seh_reference_timestamp',value: vb_timestamp.toString(),ignoreFieldChange: false});
																																	
								var i_BD_submitID = o_BD_OBJ.save({enableSourcing: true,ignoreMandatoryFields: true});
								log.debug('************** Bank Details Submit ID *********** -->'+i_BD_submitID);			
							  }	
							  catch(excsd)
							  {
								 log.error('****** ERROR ***** -->',excsd.message);							  
							  }								
					  
					  }
				   }	
				   catch(exwqnh)
				   {
					log.error (' Exception Caught to update and create bank details ... -->',exwqnh);     
				   }
			
		   }
	//	return return_val;
				
				context.response.writePage(form);
				}catch(e){
					var form = serverWidget.createForm({title: 'Error in process payment file',hideNavBar: false});
					var error = form.addField({id: 'custpage_pymt',type: serverWidget.FieldType.RICHTEXT,label: 'Error'});
					error.defaultValue=e.message;
				context.response.writePage(form);
					log.error('error in process payment file',e.message)
				}
			}

		/*	else if (context.request.method === 'POST') {

				var request=context.request;
				var response=context.response;
				log.debug('response',response);
				var userObj = runtime.getCurrentUser();
				log.debug("Name of current user: " + userObj.name);
				var salesOrderId = context.request.parameters.custpage_record;
				redirect.toRecord({
				type : record.Type.SALES_ORDER,
				id : salesOrderId,
				parameters: {'custparam_test':'helloWorld'}
			});
			}*/

		}
		catch (exp) {
			log.debug({title: "error in catch:post:-",details: exp.message});
		}
	}
	
	
	function createError(serverWidget,message,response){
		var form = serverWidget.createForm({title: 'Error in process payment file',hideNavBar: false});
					var error = form.addField({id: 'custpage_pymt',type: serverWidget.FieldType.RICHTEXT,label: 'Error'});
					error.defaultValue=message;
				response.writePage(form);
		
	}
function _logValidation(value)
	{
	  if(value!=null && value!= 'undefined' && value!=undefined && value!='' && value!='NaN' && value!=' '&& value!="0000-00-00")
	  {
		  return true;
	  }	 
	  else	  
	  {
		  return false;
	  }
	}
	function get_while(a_search_results_P)
	{
	 if(_logValidation(a_search_results_P)) 
	 {
	 	if(a_search_results_P.length>=1000)
		{
			return true
		}
	 }
	 else
	 {
	 	return false
	 }		
	}
	function remove_duplicates(arr) 
	{
	    var seen = {};
	    var ret_arr = [];
	    for(var i = 0; i < arr.length; i++) 
	    {
	        if(!(arr[i] in seen))
	        {
	            ret_arr.push(arr[i]);
	            seen[arr[i]] = true; 		   
	        }
	    }
	    return ret_arr;
	}
	function get_global_parameters()
	{		
		var a_result = {};

        try
		{
			var a_filters_GP = new Array();	
			a_filters_GP.push(search.createFilter({name: 'name',operator: search.Operator.IS,values : 'Axis Bank Integration'}));					
					
			var a_columns_GP = new Array();	
			a_columns_GP.push(search.createColumn({name: 'internalid'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_url'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_password'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_password_guid'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_port'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_email_sender'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_email_recipient'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_username'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_host_key_type'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_sftp_host_key'}));	    
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_file_name_prefix_1'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_input_directory'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_output_directory'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_reverse_file_download'}));
			a_columns_GP.push(search.createColumn({name: 'custrecord_gp_payment_file_upload'}));
		 
							
			var a_filters_GP = new Array();	
			
			var a_search_results_GP_OBJ = search.create({type: 'customrecord_global_parameters',filters: a_filters_GP,columns: a_columns_GP});
			var a_search_results_GP    = a_search_results_GP_OBJ.run().getRange({start: 0, end: 1000});

			if(_logValidation(a_search_results_GP))
			{
			  var i_recordID_GP = a_search_results_GP[0].getValue({name: 'internalid'});		  
			  var i_email_recipient_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_email_recipient'});
			  var i_email_sender_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_email_sender'});		
			  var i_SFTP_server_URL_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_url'});
			  var i_SFTP_host_key_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_host_key'});
			  var i_SFTP_host_key_type_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_host_key_type'});
			  var i_SFTP_user_name_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_username'});
			  var i_password_guid_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_password_guid'});
			  var i_SFTP_directory_1_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_input_directory'});
			  var i_SFTP_directory_2_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_output_directory'});
			  var i_SFTP_port_GP = a_search_results_GP[0].getValue({name: 'custrecord_gp_sftp_port'});
			  var i_SFTP_Upload_file_folder = a_search_results_GP[0].getValue({name: 'custrecord_gp_payment_file_upload'});
			  var i_SFTP_Download_file_folder = a_search_results_GP[0].getValue({name: 'custrecord_gp_reverse_file_download'});
			  var i_SFTP_file_prefix_name = a_search_results_GP[0].getValue({name: 'custrecord_gp_file_name_prefix_1'});
			  
			  log.debug("get_global_parameters", 'i_recordID_GP -->'+i_recordID_GP);
			  			  
			  a_result['id_gp'] = i_recordID_GP;		  
			  a_result['email_recipient_gp'] = i_email_recipient_GP;
			  a_result['email_sender_gp'] = i_email_sender_GP;		  
			  a_result['sftp_server_url_gp'] = i_SFTP_server_URL_GP;
			  a_result['sftp_host_key_gp'] = i_SFTP_host_key_GP;
			  a_result['sftp_host_key_type_gp'] = i_SFTP_host_key_type_GP;
			  a_result['sftp_user_name_gp'] = i_SFTP_user_name_GP;
			  a_result['password_guid_gp'] = i_password_guid_GP;
			  a_result['sftp_directory_1_gp'] = i_SFTP_directory_1_GP;		  
			  a_result['sftp_directory_2_gp'] = i_SFTP_directory_2_GP;
			  a_result['sftp_port_gp'] = i_SFTP_port_GP;
			  a_result['ns_upload_folder_id'] = i_SFTP_Upload_file_folder;
			  a_result['ns_download_folder_id'] = i_SFTP_Download_file_folder;
			  a_result['sftp_file_prefix_name'] = i_SFTP_file_prefix_name;		  
				
			}//Search Results		
			log.debug("get_global_parameters", 'a_result -->'+a_result);
		}	
		catch(excsw)
		{
		  log.error("ERROR EXCEPTION", 'excsw -->'+excsw);				
		}
		
		return a_result;
	}//Global Parameters
	function split_data(data_q)
	{
	   var a_data_ARR = new Array();	
	  if(_logValidation(data_q))
	  {	 
		  var i_data_TT = new Array();
		  i_data_TT =  data_q.toString();

			 if(_logValidation(i_data_TT))
			 {
				for(var dt=0;dt<i_data_TT.length;dt++)
				{
					a_data_ARR = i_data_TT.split(',');
					break;				
				}	
			}//Data TT   
	  }	  
	  return a_data_ARR ;
	}	
	function append_zero_in_date(date_q , DATEFORMAT)
	{
	  var return_str = "";	
	  try
	  {
		 var date_x = format.parse({value:date_q,type:format.Type.DATE}) 	
         var day_x = date_x.getDate();
         var month_x = date_x.getMonth()+1 ;
         var year_x = date_x.getFullYear();
		 
		 if(day_x < 10)
		 {
			 day_x = '0'+day_x ;
		 }
         if(month_x < 10)
		 {
			 month_x = '0'+month_x 
		 }			 
				 
         DATEFORMAT = DATEFORMAT.replace(/DD/g,day_x);
		 DATEFORMAT = DATEFORMAT.replace(/MM/g,month_x);
		 DATEFORMAT = DATEFORMAT.replace(/YYYY/g,year_x);
		  
		 return_str = DATEFORMAT;		 
	  }	
	  catch(excdqw)
	  {
		log.debug("Exception -->"+excdqw)  
	  }	
      return return_str;
	}
	function amount_formatting(amount , AMT_FORMAT)
	{
	 var return_data = "";	
	 try
	 {
		 var result = AMT_FORMAT.toString().split(',');
		 var result_1 = result[0];
		 var result_2 = result[1];
		 
		 var amt_result = amount.toString().split('.');
		 var amt_result_1 = amt_result[0];
		 var amt_result_2 = amt_result[1];
		 
		 var amt_1 = amt_result_1.substring(0,result_1);
		 var amt_2 = amt_result_2.substring(0,result_2);
		 var amt   = amt_1 + '.' + amt_2 ;
		 return_data = amt ;
		 
	 }	
	 catch(exsdd)
	 {
		log.error("Exception amount_formatting -->"+exsdd) 
	 }
	 return return_data ;	
	}
	function get_pay_types()
	{
	 try
	 {
		 var customrecord_axis_payment_typesSearchObj = search.create({
		   type: "customrecord_axis_payment_types",
		   filters:
		   [
		   ],
		   columns:
		   [
			  "internalid",			
			  "custrecord_apt_record_type",
			  "custrecord_apt_modes"
		   ]
		});
		var searchResultCount = customrecord_axis_payment_typesSearchObj.runPaged().count;
		log.debug("customrecord_axis_payment_typesSearchObj result count",searchResultCount);
		customrecord_axis_payment_typesSearchObj.run().each(function(result){
		// .run().each has a limit of 4,000 results
		
		var PAY_MODE  = result.getValue({name: 'custrecord_apt_modes'});
		var REC_TYPE  = result.getValue({name: 'custrecord_apt_record_type'});
		   
		PAY_TYPE_ARR[REC_TYPE] = {"paytype" : PAY_MODE};   
		return true;
		});
	 }	
	 catch(excwe)
	 {
		log.debug(' ****** excwe ****** '+excwe);						 
	 }		
	}
	
	function create_logs(recName,userId,date,date_time , success_fail_flag ,i_file_id ,file_cntr ,file_name,a_transaction_array)
	{
	  try
	  {
        var o_logsOBJ = record.create({type : 'customrecord_integration_logs',isDynamic : true});
		o_logsOBJ.setValue({fieldId: 'name', value: recName});
		o_logsOBJ.setValue({fieldId: 'custrecord_il_user_',value: userId,ignoreFieldChange: false}); 
		o_logsOBJ.setValue({fieldId: 'custrecord_il_date',value: date,ignoreFieldChange: false});
		o_logsOBJ.setValue({fieldId: 'custrecord_il_time',value: date_time,ignoreFieldChange: false});
	//	o_logsOBJ.setValue({fieldId: 'custrecord_il_sftp_connection',value: billTransTypeId,ignoreFieldChange: false}); 
		
		if(success_fail_flag == true)
		{
			o_logsOBJ.setValue({fieldId: 'custrecord_il_file_status',value: 4,ignoreFieldChange: false});  			
		}//Success 
		else
		{
		   o_logsOBJ.setValue({fieldId: 'custrecord_il_file_status',value: 2,ignoreFieldChange: false});  	
		}//Failure
							
		if(_logValidation(i_file_id)){
			o_logsOBJ.setValue({fieldId: 'custrecord_il_payment_file_',value: i_file_id ,ignoreFieldChange: false});  
		}
		if(_logValidation(file_cntr))
		{						
			o_logsOBJ.setValue({fieldId: 'custrecord_il_file_counter',value: file_cntr ,ignoreFieldChange: false});  
		}							
		
		if(_logValidation(file_name))
		{
			o_logsOBJ.setValue({fieldId: 'custrecord_il_file_name',value: file_name ,ignoreFieldChange: false});  
		}
		if(_logValidation(a_transaction_array))
		{
			o_logsOBJ.setValue({fieldId: 'custrecord_il_transaction',value: a_transaction_array ,ignoreFieldChange: false});
		}		
		var i_logs_submitID = o_logsOBJ.save({enableSourcing: true,ignoreMandatoryFields: true});
		log.debug('************** Log Submit ID *********** -->'+i_logs_submitID);
		redirect.toRecord({
			type: 'customrecord_integration_logs',
			id: i_logs_submitID,
			
		});		
	  }	
	  catch(excsd)
	  {
		 log.error('****** ERROR in create_logs ***** -->'+excsd);		
  
	  }		
	}
	function update_processed(a_transaction_array)
	{
	 try
	 {
		for(var p_1 =0 ; p_1 <a_transaction_array.length ; p_1++)
		{
		  if(_logValidation(a_transaction_array[p_1]))
		  {
			 try
			 {
				var i_TR_submitID = record.submitFields({type: "vendorbill",id: a_transaction_array[p_1], 
					values: {   		    
							custbody_is_bank_file_created: true						
					},
					options: {enableSourcing: true,ignoreMandatoryFields : true}});  
			log.debug('****** i_TR_submitID A ***** -->'+i_TR_submitID);		
			 } 
			 catch(excww)
			 {
				var i_TR_submitID = record.submitFields({type: "vendorprepayment",id: a_transaction_array[p_1], 
					values: {   		    
							custbody_is_bank_file_created: true						
					},
					options: {enableSourcing: true,ignoreMandatoryFields : true}}); 
             log.debug('****** i_TR_submitID B ***** -->'+i_TR_submitID);					
			 }
			
		  }			  
		}			
	 }	
	 catch(excs)
	 {
	   log.error('****** ERROR UPDATE update_processed***** -->'+excs);		 
	 }
	}
	function convert_date(d_date)
	{
	  var d_date_convert = "" ;	
	  if(_logValidation(d_date))
		{
			var currentTime = new Date(d_date);
			var currentOffset = currentTime.getTimezoneOffset();
			var ISTOffset = 330;   // IST offset UTC +5:30 
			d_date_convert = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
		}	
		return d_date_convert; 
	}
	
	function create_file_counter(file_counter , id_x)
	{
	  try
	  {
		  if(!_logValidation(id_x))
		  {
			 var o_FL_OBJ = record.create({type: 'customrecord_axis_file_auto_numbering',isDynamic: true});  
		  }
		  else
		  {
			 var o_FL_OBJ = record.load({type: 'customrecord_axis_file_auto_numbering',id: id_x ,isDynamic: true});  
		  }
		  
		 o_FL_OBJ.setValue({fieldId: 'custrecord_afc_counter',value: file_counter ,ignoreFieldChange: false}); 
		 
		 var d_date_R   = new Date();
		 d_date_R = convert_date(d_date_R);
		 
		 o_FL_OBJ.setValue({fieldId: 'custrecord_afc_date',value: d_date_R ,ignoreFieldChange: false}); 
		  
		  var i_FL_logs_submitID = o_FL_OBJ.save({enableSourcing: true,ignoreMandatoryFields: true});
		 log.debug('************** FL Submit ID *********** -->'+i_FL_logs_submitID);	
		  
	  }	
	  catch(excfr)
	  {
		 log.error('****** ERROR Ex LOGS ***** -->'+excfr);		   
	  }	
	}	
	function get_file_counter_no(file_initial_counter) // customrecord_axis_file_auto_numbering
	{
	var finalSeqNo = 0;
	var seqNo = 0 ;
	var id_cnt = 0;
	 try
	 {		 
		try
		{
			var customrecord_il_logsSearchObj = search.create({
			   type: "customrecord_axis_file_auto_numbering",
			   filters:
			   [
				//  ["name","startswith","Axis_Integration_"], 
				//  "AND", 
				  ["custrecord_afc_date","on","today"]
			   ],
			   columns:
			   [
				 search.createColumn({name: "internalid",sort: search.Sort.DESC}),
				 search.createColumn({name: "custrecord_afc_counter"})
			   ]
			});
			
			var searchResultCount		= customrecord_il_logsSearchObj.runPaged().count;
			var resultIndex = 0; 
			var resultStep = 1000;
			var searchResult = customrecord_il_logsSearchObj.run().getRange({
				start: resultIndex,
				end: resultIndex + resultStep
			}); 
			var t = 0 ;
		//	for(var t=0; t< searchResultCount;t++) 
			{
				var id_ = searchResult[t].getValue({name: "internalid"});
				id_cnt = id_ ;
				seqNo = searchResult[t].getValue({name: "custrecord_afc_counter"});
			}	
		} 
		catch(excdq)
		{
			//log.debug("excdq excdq "+excdq)
		}		 				
		if(seqNo!=0 && seqNo!=null & seqNo!='' && seqNo!=undefined)
		{
			finalSeqNo = Number(seqNo)+1;
		}
		if(seqNo == null || seqNo == "" || seqNo == undefined)
		{
			finalSeqNo = file_initial_counter;
		}
		create_file_counter(finalSeqNo , id_cnt)
		
	 }	
	 catch(excd)
	 {
		log.debug("excd -->"+excd) 
	 }		
	 return finalSeqNo ;
	}
	
	
	function get_payment_no(file_initial_counter)
	{
		var finalSeqNo = 0;
		var seqNo = 0 ;
	 try
	 {
		 
		try
		{
				var customrecord_il_logsSearchObj = search.create({
			   type: "customrecord_integration_logs",
			   filters:
			   [
				  ["name","startswith","Axis_Integration_"], 
				  "AND", 
				  ["created","on","today"]
			   ],
			   columns:
			   [
				 search.createColumn({name: "internalid",sort: search.Sort.DESC}),
				  search.createColumn({name: "name"}),
				  search.createColumn({name: "custrecord_il_date"}),
				  search.createColumn({name: "custrecord_il_file_counter"})
			   ]
			});
			
			var searchResultCount		= customrecord_il_logsSearchObj.runPaged().count;
			var resultIndex = 0; 
			var resultStep = 1000;
			var searchResult = customrecord_il_logsSearchObj.run().getRange({
				start: resultIndex,
				end: resultIndex + resultStep
			}); 
			var t = 0 ;
			for(var t=0; t< searchResultCount;t++) // this was already commented by developer
			{
				var id_ = searchResult[t].getValue({name: "internalid"});
				log.debug("id_",id_)
				var name  = searchResult[t].getValue({name: "name"});
				var date  = searchResult[t].getValue({name: "custrecord_il_date"});
				seqNo = searchResult[t].getValue({name: "custrecord_il_file_counter"});
			}	
		} 
		catch(excdq)
		{
			log.error("excdq excdq "+excdq)
		}				
		if(seqNo!=0 && seqNo!=null & seqNo!='' && seqNo!=undefined)
		{
			finalSeqNo = Number(seqNo)+1;
		}
		if(seqNo == null || seqNo == "" || seqNo == undefined)
		{
			finalSeqNo = file_initial_counter;
		}
		
	 }	
	 catch(excd)
	 {
		log.error("excd -->"+excd) 
	 }
		
	 return finalSeqNo ;	
	}



	return {
		onRequest: onRequest
	};
});