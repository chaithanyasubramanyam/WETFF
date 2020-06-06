pragma solidity ^0.4.17;


contract Factory {
    address[] deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address deployedCampaignAddress = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(deployedCampaignAddress);
    }

    function getCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}


contract Campaign {
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 approversCount;
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint256 minimum, address userAddress) public {
        manager = userAddress;
        minimumContribution = minimum;
        approversCount++;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
    }

    function createRequest(
        string description,
        uint256 value,
        address recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint256 index) public {
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);

        requests[index].approvalCount++;
        requests[index].approvals[msg.sender] = true;
    }

    function finalizeRequest(uint256 index) public restricted {
        require(requests[index].approvalCount > (approversCount / 2));
        require(!requests[index].complete);
        requests[index].complete = true;
        requests[index].recipient.transfer(requests[index].value);
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }
}
