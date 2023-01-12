export class CertificateModel {
  constructor(name, organization, issueDate, credentialURL) {
    this.name = name;
    this.organization = organization;
    this.issueDate = issueDate;
    this.credentialURL = credentialURL;
  }
}
