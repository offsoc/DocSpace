﻿namespace ASC.Files.Core.ApiModels.RequestDto;

public class CopyAsRequestDto<T>
{
    public string DestTitle { get; set; }
    public T DestFolderId { get; set; }
    public bool EnableExternalExt { get; set; }
    public string Password { get; set; }
}
