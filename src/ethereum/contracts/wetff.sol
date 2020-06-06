// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.4.26;


// pragma experimental ABIEncoderV2;

contract wetff {
    // When user add the user given data from the color page
    // those values will be stored in an array of this struct scheme

    // general struct for all user values
    struct userValues {
        address userAddress;
        string brand;
        string model;
        string date;
    }

    // struct to store item images
    struct userValueItemImage {
        string itemimg1;
        string itemimg2;
        string itemimg3;
        string itemimg4;
        string itemimg5;
    }

    // struct for store bill images
    struct userValueBillImage {
        string billimg1;
        string billimg2;
        string billimg3;
        string billimg4;
        string billimg5;
    }

    // When Vendor add values, those values will be saved along
    // with the index refering to those user given data
    struct vendorValues {
        uint256 userValueIndex;
        address vendorAddress;
        uint256 vendorInput1;
        uint256 vendorInput2;
        uint256 vendorInput3;
    }

    // When admin add its admin given values, those values will ve saved along
    // with the index refering to that vendor data
    // that vendor data at that index also have that user's data
    struct adminValues {
        uint256 vendorvalueIndex;
        address adminAddress;
        uint256 adminInput1;
        uint256 adminInput2;
        uint256 adminInput3;
    }

    // Storage for user values
    // Storage for vendor values
    // Storage for admin values

    // userValues[] public uservalues;
    // vendorValues[] public vendorvalues;
    // adminValues[] public adminvalues;
    // userValueItemImage[] public userItemImage;
    // userValueBillImage[] public userBillImage;

    mapping(uint256 => userValues[]) public userdataMap;
    mapping(uint256 => userValueItemImage[]) public itemimgMap;
    mapping(uint256 => userValueBillImage[]) public billimgMap;

    mapping(address => userValues[]) public uservalueMap;
    mapping(address => vendorValues[]) public vendorvalueMap;
    mapping(address => adminValues[]) public adminvalueMap;

    // Input Functions

    // @name: addUserData()
    // @param: _brand, _class, _model, _data, _img1, _img2;
    function addUserData(
        string _brand,
        uint256 _class,
        string _model,
        string _data
    ) public {
        userValues memory newuservalues = userValues({
            userAddress: msg.sender,
            brand: _brand,
            model: _model,
            date: _data
        });

        userdataMap[_class].push(newuservalues);
        uservalueMap[msg.sender].push(newuservalues);
    }

    // @name: addUserBillImg()
    // @param: _itemimg1, _itemimg2, _itemimg3, _itemimg4, _itemimg5

    function addUserItemImg(
        uint256 _class,
        string _itemimg1,
        string _itemimg2,
        string _itemimg3,
        string _itemimg4,
        string _itemimg5
    ) public {
        userValueItemImage memory newuservalues = userValueItemImage({
            itemimg1: _itemimg1,
            itemimg2: _itemimg2,
            itemimg3: _itemimg3,
            itemimg4: _itemimg4,
            itemimg5: _itemimg5
        });

        itemimgMap[_class].push(newuservalues);
    }

    // @name: addUserBillImg()
    // @param: _billimg1, _billimg2, _billimg3, _billimg4, _billimg5
    function addUserBillImg(
        uint256 _class,
        string _billimg1,
        string _billimg2,
        string _billimg3,
        string _billimg4,
        string _billimg5
    ) public {
        userValueBillImage memory newuservalues = userValueBillImage({
            billimg1: _billimg1,
            billimg2: _billimg2,
            billimg3: _billimg3,
            billimg4: _billimg4,
            billimg5: _billimg5
        });

        billimgMap[_class].push(newuservalues);
    }

    // @name: addVendorData()
    // @param: _indexUserArray, _vendorInput1, _vendorInput2, _vendorInput3;
    function addVendorData(
        uint256 _indexUserArray,
        uint256 _vendorInput1,
        uint256 _vendorInput2,
        uint256 _vendorInput3
    ) public {
        vendorValues memory newvendorvalues = vendorValues({
            userValueIndex: _indexUserArray,
            vendorAddress: msg.sender,
            vendorInput1: _vendorInput1,
            vendorInput2: _vendorInput2,
            vendorInput3: _vendorInput3
        });

        vendorvalueMap[msg.sender].push(newvendorvalues);
    }

    // @name: addAdminData()
    // @param: _indexVendorArray, _adminInput1, _adminInput2, _adminInput3;

    function addAdminData(
        uint256 _indexVendorArray,
        uint256 _adminInput1,
        uint256 _adminInput2,
        uint256 _adminInput3
    ) public {
        adminValues memory newadminvalues = adminValues({
            vendorvalueIndex: _indexVendorArray,
            adminAddress: msg.sender,
            adminInput1: _adminInput1,
            adminInput2: _adminInput2,
            adminInput3: _adminInput3
        });

        adminvalueMap[msg.sender].push(newadminvalues);
    }

    // Return length Functions

    // @name: getUserValuesLength()
    // @returns: uservalues array length

    function getUserValuesLength(uint256 _class) public view returns (uint256) {
        return userdataMap[_class].length;
    }

    // @name: getVendorValuesLength()
    // @returns: vendorvalues array length

    function getVendorValuesLength(address _address)
        public
        view
        returns (uint256)
    {
        return vendorvalueMap[_address].length;
    }

    // @name: getAdminValuesLength()
    // @returns: adminvalues array length

    function getAdminValuesLength(address _address)
        public
        view
        returns (uint256)
    {
        return adminvalueMap[_address].length;
    }

    // Return array Functions

    // @name: getUserValues()
    // @returns: uservalues array

    // function getUserValues() public view returns (userValues[]) {
    //     return uservalues;
    // }

    // @name: getVendorValues()
    // @returns: vendorvalues array

    // function getVendorValues() public view returns (vendorValues[]) {
    //     return vendorvalues;
    // }

    // @name: getAdminValues()
    // @returns: adminvalues array

    // function getAdminValues() public view returns (adminValues[]) {
    //     return adminvalues;
    // }
}
