$(function() {

	
	//初期文字カウント表記
	$('.text_counter').each(function()
	{
		//現在の長さ
		var text_length = $(this).val().length;
		//結果出力先(id名)
		var result_id = $(this).attr('result_id');
		
		
		if(0 < $('#' + result_id).length)
		{
			//桁制御
			text_length = ('00' +text_length).slice(-3);
			//出力
			$('#' + result_id).html('現在' + text_length + '文字');
		}
		
	});

	//ユーザー入力時の文字カウント(キーを押した場合）
	$(".text_counter").on("keydown keypress change",function()
	{
		//現在の長さ
		var text_length = $(this).val().length;
		//結果出力先(id名)
		var result_id = $(this).attr('result_id');
		
		if(0 < $('#' + result_id).length)
		{
			//赤文字判定
			var add_code_start = '';
			var add_code_end = '';
			if(500 <= parseInt(text_length))
			{
				add_code_start = '<span class="red">';
				add_code_end = '</span>';
			}
			
			//桁制御	
			text_length = ('00' +text_length).slice(-3);
			//出力
			$('#' + result_id).html(add_code_start + '現在' + text_length + '文字' + add_code_end);
		}
	});
	
	
	//ユーザー入力時の文字カウント(キーを離した場合）
	//$(".text_counter").on("keydown keyup keypress change",function()
	$(".text_counter").on("keyup change",function()
	{
		//現在の長さ
		var text_length = $(this).val().length;
		//結果出力先(id名)
		var result_id = $(this).attr('result_id');
		
		if(0 < $('#' + result_id).length)
		{
			//元の文字列の長さを保持しておく
			var orignal_length = text_length;
			
			//文字を500以内
			if(500 < text_length)
			{
				trim = $(this).val().slice(0, 500);
				$(this).val(trim);
				text_length = trim.length;
			}
			//赤文字判定
			var add_code_start = '';
			var add_code_end = '';
			if(500 <= parseInt(text_length))
			{
				add_code_start = '<span class="red">';
				add_code_end = '</span>';
				
				//501文字以上の時は警告表示をする
				if(500 < orignal_length)
				{
					add_code_end += "<br>" + '<span class="red bold">500文字以内で入力してください<span>';
				}
			}
			
			
			//桁制御			
			text_length = ('00' +text_length).slice(-3);
			//出力
			$('#' + result_id).html(add_code_start + '現在' + text_length + '文字' + add_code_end);
		}
		
	});
	
	/*確認ボタン*/
	if($(".agreement_check").prop('checked'))
	{
		$('.submit#dummy').addClass('disnon');
		$('.submit#register').removeClass('disnon');
	}
	else
	{
		$('.submit#dummy').removeClass('disnon');
		$('.submit#register').addClass('disnon');
	}
	
	$(".agreement_check").change(function()
	{
		if($(this).prop('checked'))
		{
			$('.submit#dummy').addClass('disnon');
			$('.submit#register').removeClass('disnon');
		}
		else
		{
			$('.submit#dummy').removeClass('disnon');
			$('.submit#register').addClass('disnon');
		}
	});
	
	/*郵便番号自動計算ボタン*/
	$('.zipcode_button').click(function()
	{
		// 存在確認
		if( $('#Userzipcode').length > 0 ){
			// zipcodeが有るときだけイベント発火
			//コピペ等のイベントが反応しないことがあるので
			//change()で実行する

				// 存在チェック
				var use_pref = ($('#Userpref').length > 0);
				var use_zip = ($('#Userzip').length > 0 );

				// 住所が存在するときに、上書きチェックをします。
				var allow_overwrite = true; // デフォルト上書き

				//zip2addrは引数4つ目と5つ目を同じにすると
				//うまく動かないので4つ目までにすること
				if( use_pref && use_zip ){
					// 両方使うとき
					if( allow_overwrite ){
						AjaxZip3.zip2addr('data[User][zipcode]','','data[User][pref]','data[User][zip]');
					}
				}else if( use_pref && !use_zip ){
					// 都道府県だけ使うときは、動作させません。
				}else if( !use_pref && use_zip ){
					// 住所だけ使うとき
					if( allow_overwrite ){
						AjaxZip3.zip2addr('data[User][zipcode]','','data[User][zip]','data[User][zip]');
					}
				}
		}
		

	});
	
	/*お申込みボタンを押した場合に利用規約のところがエラーになるようにする*/
	$('#dummy div').click(function()
	{
		$('#Userfree8_0').click();
		$('#Userfree8_0').click();

		
	});
	
	
	/*文字数制限*/
	$(".sting_limit").on("keyup keydown keypress change",function()
	{
		//制限文字数
		var limit = $(this).attr('limit');

		if(limit != '' && limit != undefined)
		{
			var string = $(this).val();
			string = string.slice(0, limit);
			
			$(this).val(string);
		}
	});
	
	
	
	
});