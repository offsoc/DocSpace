﻿// (c) Copyright Ascensio System SIA 2010-2022
//
// This program is a free software product.
// You can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
// Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
// to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
// any third-party rights.
//
// This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
// of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
// the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
//
// You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
//
// The  interactive user interfaces in modified source and object code versions of the Program must
// display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
//
// Pursuant to Section 7(b) of the License you must retain the original Product logo when
// distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
// trademark law for use of our trademarks.
//
// All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
// content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
// International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode

namespace ASC.Files.Core.Helpers;

public static class RoomTemplateValidator
{
    private static readonly HashSet<FileShare> _fillingFormsRoom = new HashSet<FileShare>() { FileShare.FillForms, FileShare.ReadWrite, FileShare.Read, FileShare.None, FileShare.RoomManager };
    private static readonly HashSet<FileShare> _editingRoom = new HashSet<FileShare>() { FileShare.ReadWrite, FileShare.Read, FileShare.Review, FileShare.None, FileShare.RoomManager };
    private static readonly HashSet<FileShare> _reviewRoom = new HashSet<FileShare> { FileShare.ReadWrite, FileShare.Read, FileShare.None, FileShare.Review, FileShare.Comment, FileShare.Restrict, FileShare.RoomManager };
    private static readonly HashSet<FileShare> _readOnlyRoom = new HashSet<FileShare> { FileShare.ReadWrite, FileShare.Read, FileShare.Restrict, FileShare.None, FileShare.RoomManager };

    public static bool Validate(FileShare share, FolderType folderType)
    {
        switch (folderType)
        {
            case FolderType.FillingFormsRoom:
                return _fillingFormsRoom.Contains(share);
            case FolderType.EditingRoom:
                return _editingRoom.Contains(share);
            case FolderType.ReviewRoom:
                return _reviewRoom.Contains(share);
            case FolderType.ReadOnlyRoom:
                return _readOnlyRoom.Contains(share);
            default:
                return true;
        }
    }
}