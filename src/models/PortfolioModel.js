export class PortfolioModel {
  constructor(
    fullName,
    email,
    phoneNumber,
    summary,
    workExperience,
    education,
    skills,
    references,
    certificates,
    achievements
  ) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.summary = summary;
    this.workExperience = workExperience;
    this.education = education;
    this.skills = skills;
    this.references = references;
    this.certificates = certificates;
    this.achievements = achievements;
  }
}
