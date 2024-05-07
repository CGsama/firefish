/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

export const SECOND: number
export const MINUTE: number
export const HOUR: number
export const DAY: number
export const USER_ONLINE_THRESHOLD: number
export const USER_ACTIVE_THRESHOLD: number
/**
 * List of file types allowed to be viewed directly in the browser
 * Anything not included here will be responded as application/octet-stream
 * SVG is not allowed because it generates XSS <- we need to fix this and later allow it to be viewed directly
 * https://github.com/sindresorhus/file-type/blob/main/supported.js
 * https://github.com/sindresorhus/file-type/blob/main/core.js
 * https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers
 */
export const FILE_TYPE_BROWSERSAFE: string[]
export interface EnvConfig {
  onlyQueue: boolean
  onlyServer: boolean
  noDaemons: boolean
  disableClustering: boolean
  verbose: boolean
  withLogTime: boolean
  slow: boolean
}
export function loadEnv(): EnvConfig
export interface ServerConfig {
  url: string
  port: number
  /** host to listen on */
  bind?: string
  disableHsts?: boolean
  db: DbConfig
  redis: RedisConfig
  cacheServer?: RedisConfig
  proxy?: string
  proxySmtp?: string
  proxyBypassHosts?: Array<string>
  allowedPrivateNetworks?: Array<string>
  /** `NapiValue` is not implemented for `u64` */
  maxFileSize?: number
  accessLog?: string
  clusterLimits?: WorkerConfigInternal
  cuid?: IdConfig
  outgoingAddress?: string
  deliverJobConcurrency?: number
  inboxJobConcurrency?: number
  deliverJobPerSec?: number
  inboxJobPerSec?: number
  deliverJobMaxAttempts?: number
  inboxJobMaxAttempts?: number
  /** deprecated */
  logLevel?: Array<string>
  maxLogLevel?: string
  syslog?: SysLogConfig
  proxyRemoteFiles?: boolean
  mediaProxy?: string
  summalyProxyUrl?: string
  reservedUsernames?: Array<string>
  maxUserSignups?: number
  isManagedHosting?: boolean
  maxNoteLength?: number
  maxCaptionLength?: number
  deepl?: DeepLConfig
  libreTranslate?: LibreTranslateConfig
  email?: EmailConfig
  objectStorage?: ObjectStorageConfig
}
export interface DbConfig {
  host: string
  port: number
  db: string
  user: string
  pass: string
  disableCache?: boolean
  extra?: any
}
export interface RedisConfig {
  host: string
  port: number
  family?: number
  user?: string
  pass?: string
  tls?: TlsConfig
  db: number
  prefix?: string
}
export interface TlsConfig {
  host: string
  rejectUnauthorized: boolean
}
export interface WorkerConfig {
  web: number
  queue: number
}
export interface WorkerConfigInternal {
  web?: number
  queue?: number
}
export interface IdConfig {
  length?: number
  fingerprint?: string
}
export interface SysLogConfig {
  host: string
  port: number
}
export interface DeepLConfig {
  managed?: boolean
  authKey?: string
  isPro?: boolean
}
export interface LibreTranslateConfig {
  managed?: boolean
  apiUrl?: string
  apiKey?: string
}
export interface EmailConfig {
  managed?: boolean
  address?: string
  host?: string
  port?: number
  user?: string
  pass?: string
  useImplicitSslTls?: boolean
}
export interface ObjectStorageConfig {
  managed?: boolean
  baseUrl?: string
  bucket?: string
  prefix?: string
  endpoint?: string
  region?: string
  accessKey?: string
  secretKey?: string
  useSsl?: boolean
  connnectOverProxy?: boolean
  setPublicReadOnUpload?: boolean
  s3ForcePathStyle?: boolean
}
export interface Config {
  url: string
  port: number
  bind?: string
  disableHsts?: boolean
  db: DbConfig
  redis: RedisConfig
  cacheServer?: RedisConfig
  proxy?: string
  proxySmtp?: string
  proxyBypassHosts?: Array<string>
  allowedPrivateNetworks?: Array<string>
  maxFileSize?: number
  accessLog?: string
  clusterLimits: WorkerConfig
  cuid?: IdConfig
  outgoingAddress?: string
  deliverJobConcurrency?: number
  inboxJobConcurrency?: number
  deliverJobPerSec?: number
  inboxJobPerSec?: number
  deliverJobMaxAttempts?: number
  inboxJobMaxAttempts?: number
  /** deprecated */
  logLevel?: Array<string>
  maxLogLevel?: string
  syslog?: SysLogConfig
  proxyRemoteFiles?: boolean
  mediaProxy?: string
  summalyProxyUrl?: string
  reservedUsernames?: Array<string>
  maxUserSignups?: number
  isManagedHosting?: boolean
  maxNoteLength: number
  maxCaptionLength: number
  deepl?: DeepLConfig
  libreTranslate?: LibreTranslateConfig
  email?: EmailConfig
  objectStorage?: ObjectStorageConfig
  version: string
  host: string
  hostname: string
  redisKeyPrefix: string
  scheme: string
  wsScheme: string
  apiUrl: string
  wsUrl: string
  authUrl: string
  driveUrl: string
  userAgent: string
  clientEntry: Manifest
}
export interface Manifest {
  file: string
  name: string
  src: string
  isEntry: boolean
  isDynamicEntry: boolean
  imports: Array<string>
  dynamicImports: Array<string>
  css: Array<string>
  assets: Array<string>
}
export function loadConfig(): Config
export interface Acct {
  username: string
  host: string | null
}
export function stringToAcct(acct: string): Acct
export function acctToString(acct: Acct): string
export function addNoteToAntenna(antennaId: string, note: Note): void
/**
 * Checks if a server is blocked.
 *
 * ## Argument
 * `host` - punycoded instance host
 */
export function isBlockedServer(host: string): Promise<boolean>
/**
 * Checks if a server is silenced.
 *
 * ## Argument
 * `host` - punycoded instance host
 */
export function isSilencedServer(host: string): Promise<boolean>
/**
 * Checks if a server is allowlisted.
 * Returns `Ok(true)` if private mode is disabled.
 *
 * ## Argument
 * `host` - punycoded instance host
 */
export function isAllowedServer(host: string): Promise<boolean>
/** TODO: handle name collisions better */
export interface NoteLikeForCheckWordMute {
  fileIds: Array<string>
  userId: string | null
  text: string | null
  cw: string | null
  renoteId: string | null
  replyId: string | null
}
export function checkWordMute(note: NoteLikeForCheckWordMute, mutedWordLists: Array<Array<string>>, mutedPatterns: Array<string>): Promise<boolean>
export function getFullApAccount(username: string, host?: string | undefined | null): string
export function isSelfHost(host?: string | undefined | null): boolean
export function isSameOrigin(uri: string): boolean
export function extractHost(uri: string): string
export function toPuny(host: string): string
export function isUnicodeEmoji(s: string): boolean
export function sqlLikeEscape(src: string): string
export function safeForSql(src: string): boolean
/** Convert milliseconds to a human readable string */
export function formatMilliseconds(milliseconds: number): string
export interface ImageSize {
  width: number
  height: number
}
export function getImageSizeFromUrl(url: string): Promise<ImageSize>
/** TODO: handle name collisions better */
export interface NoteLikeForGetNoteSummary {
  fileIds: Array<string>
  text: string | null
  cw: string | null
  hasPoll: boolean
}
export function getNoteSummary(note: NoteLikeForGetNoteSummary): string
export function isSafeUrl(url: string): boolean
export function latestVersion(): Promise<string>
export function toMastodonId(firefishId: string): string | null
export function fromMastodonId(mastodonId: string): string | null
export function fetchMeta(useCache: boolean): Promise<Meta>
export interface PugArgs {
  img: string | null
  title: string
  instanceName: string
  desc: string | null
  icon: string | null
  splashIcon: string | null
  themeColor: string | null
  randomMotd: string
  privateMode: boolean | null
}
export function metaToPugArgs(meta: Meta): PugArgs
export function nyaify(text: string, lang?: string | undefined | null): string
export function hashPassword(password: string): string
export function verifyPassword(password: string, hash: string): boolean
export function isOldPasswordAlgorithm(hash: string): boolean
export interface DecodedReaction {
  reaction: string
  name: string | null
  host: string | null
}
export function decodeReaction(reaction: string): DecodedReaction
export function countReactions(reactions: Record<string, number>): Record<string, number>
export function toDbReaction(reaction?: string | undefined | null, host?: string | undefined | null): Promise<string>
/** Delete all entries in the "attestation_challenge" table created at more than 5 minutes ago */
export function removeOldAttestationChallenges(): Promise<void>
export interface AbuseUserReport {
  id: string
  createdAt: Date
  targetUserId: string
  reporterId: string
  assigneeId: string | null
  resolved: boolean
  comment: string
  targetUserHost: string | null
  reporterHost: string | null
  forwarded: boolean
}
export interface AccessToken {
  id: string
  createdAt: Date
  token: string
  hash: string
  userId: string
  appId: string | null
  lastUsedAt: Date | null
  session: string | null
  name: string | null
  description: string | null
  iconUrl: string | null
  permission: Array<string>
  fetched: boolean
}
export interface Ad {
  id: string
  createdAt: Date
  expiresAt: Date
  place: string
  priority: string
  url: string
  imageUrl: string
  memo: string
  ratio: number
}
export interface Announcement {
  id: string
  createdAt: Date
  text: string
  title: string
  imageUrl: string | null
  updatedAt: Date | null
  showPopup: boolean
  isGoodNews: boolean
}
export interface AnnouncementRead {
  id: string
  userId: string
  announcementId: string
  createdAt: Date
}
export interface Antenna {
  id: string
  createdAt: Date
  userId: string
  name: string
  src: AntennaSrcEnum
  userListId: string | null
  keywords: Json
  withFile: boolean
  expression: string | null
  notify: boolean
  caseSensitive: boolean
  withReplies: boolean
  userGroupJoiningId: string | null
  users: Array<string>
  excludeKeywords: Json
  instances: Json
}
export interface App {
  id: string
  createdAt: Date
  userId: string | null
  secret: string
  name: string
  description: string
  permission: Array<string>
  callbackUrl: string | null
}
export interface AttestationChallenge {
  id: string
  userId: string
  challenge: string
  createdAt: Date
  registrationChallenge: boolean
}
export interface AuthSession {
  id: string
  createdAt: Date
  token: string
  userId: string | null
  appId: string
}
export interface Blocking {
  id: string
  createdAt: Date
  blockeeId: string
  blockerId: string
}
export interface Channel {
  id: string
  createdAt: Date
  lastNotedAt: Date | null
  userId: string | null
  name: string
  description: string | null
  bannerId: string | null
  notesCount: number
  usersCount: number
}
export interface ChannelFollowing {
  id: string
  createdAt: Date
  followeeId: string
  followerId: string
}
export interface ChannelNotePining {
  id: string
  createdAt: Date
  channelId: string
  noteId: string
}
export interface Clip {
  id: string
  createdAt: Date
  userId: string
  name: string
  isPublic: boolean
  description: string | null
}
export interface ClipNote {
  id: string
  noteId: string
  clipId: string
}
export interface DriveFile {
  id: string
  createdAt: Date
  userId: string | null
  userHost: string | null
  md5: string
  name: string
  type: string
  size: number
  comment: string | null
  properties: Json
  storedInternal: boolean
  url: string
  thumbnailUrl: string | null
  webpublicUrl: string | null
  accessKey: string | null
  thumbnailAccessKey: string | null
  webpublicAccessKey: string | null
  uri: string | null
  src: string | null
  folderId: string | null
  isSensitive: boolean
  isLink: boolean
  blurhash: string | null
  webpublicType: string | null
  requestHeaders: Json | null
  requestIp: string | null
  usageHint: DriveFileUsageHintEnum | null
}
export interface DriveFolder {
  id: string
  createdAt: Date
  name: string
  userId: string | null
  parentId: string | null
}
export interface Emoji {
  id: string
  updatedAt: Date | null
  name: string
  host: string | null
  originalUrl: string
  uri: string | null
  type: string | null
  aliases: Array<string>
  category: string | null
  publicUrl: string
  license: string | null
  width: number | null
  height: number | null
}
export interface FollowRequest {
  id: string
  createdAt: Date
  followeeId: string
  followerId: string
  requestId: string | null
  followerHost: string | null
  followerInbox: string | null
  followerSharedInbox: string | null
  followeeHost: string | null
  followeeInbox: string | null
  followeeSharedInbox: string | null
}
export interface Following {
  id: string
  createdAt: Date
  followeeId: string
  followerId: string
  followerHost: string | null
  followerInbox: string | null
  followerSharedInbox: string | null
  followeeHost: string | null
  followeeInbox: string | null
  followeeSharedInbox: string | null
}
export interface GalleryLike {
  id: string
  createdAt: Date
  userId: string
  postId: string
}
export interface GalleryPost {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string | null
  userId: string
  fileIds: Array<string>
  isSensitive: boolean
  likedCount: number
  tags: Array<string>
}
export interface Hashtag {
  id: string
  name: string
  mentionedUserIds: Array<string>
  mentionedUsersCount: number
  mentionedLocalUserIds: Array<string>
  mentionedLocalUsersCount: number
  mentionedRemoteUserIds: Array<string>
  mentionedRemoteUsersCount: number
  attachedUserIds: Array<string>
  attachedUsersCount: number
  attachedLocalUserIds: Array<string>
  attachedLocalUsersCount: number
  attachedRemoteUserIds: Array<string>
  attachedRemoteUsersCount: number
}
export interface Instance {
  id: string
  caughtAt: Date
  host: string
  usersCount: number
  notesCount: number
  followingCount: number
  followersCount: number
  latestRequestSentAt: Date | null
  latestStatus: number | null
  latestRequestReceivedAt: Date | null
  lastCommunicatedAt: Date
  isNotResponding: boolean
  softwareName: string | null
  softwareVersion: string | null
  openRegistrations: boolean | null
  name: string | null
  description: string | null
  maintainerName: string | null
  maintainerEmail: string | null
  infoUpdatedAt: Date | null
  isSuspended: boolean
  iconUrl: string | null
  themeColor: string | null
  faviconUrl: string | null
}
export interface MessagingMessage {
  id: string
  createdAt: Date
  userId: string
  recipientId: string | null
  text: string | null
  isRead: boolean
  fileId: string | null
  groupId: string | null
  reads: Array<string>
  uri: string | null
}
export interface Meta {
  id: string
  name: string | null
  description: string | null
  maintainerName: string | null
  maintainerEmail: string | null
  disableRegistration: boolean
  disableLocalTimeline: boolean
  disableGlobalTimeline: boolean
  useStarForReactionFallback: boolean
  langs: Array<string>
  hiddenTags: Array<string>
  blockedHosts: Array<string>
  mascotImageUrl: string | null
  bannerUrl: string | null
  errorImageUrl: string | null
  iconUrl: string | null
  cacheRemoteFiles: boolean
  enableRecaptcha: boolean
  recaptchaSiteKey: string | null
  recaptchaSecretKey: string | null
  localDriveCapacityMb: number
  remoteDriveCapacityMb: number
  summalyProxy: string | null
  enableEmail: boolean
  email: string | null
  smtpSecure: boolean
  smtpHost: string | null
  smtpPort: number | null
  smtpUser: string | null
  smtpPass: string | null
  enableServiceWorker: boolean
  swPublicKey: string | null
  swPrivateKey: string | null
  pinnedUsers: Array<string>
  tosUrl: string | null
  repositoryUrl: string
  feedbackUrl: string | null
  useObjectStorage: boolean
  objectStorageBucket: string | null
  objectStoragePrefix: string | null
  objectStorageBaseUrl: string | null
  objectStorageEndpoint: string | null
  objectStorageRegion: string | null
  objectStorageAccessKey: string | null
  objectStorageSecretKey: string | null
  objectStoragePort: number | null
  objectStorageUseSsl: boolean
  proxyAccountId: string | null
  objectStorageUseProxy: boolean
  enableHcaptcha: boolean
  hcaptchaSiteKey: string | null
  hcaptchaSecretKey: string | null
  objectStorageSetPublicRead: boolean
  pinnedPages: Array<string>
  backgroundImageUrl: string | null
  logoImageUrl: string | null
  pinnedClipId: string | null
  objectStorageS3ForcePathStyle: boolean
  allowedHosts: Array<string> | null
  secureMode: boolean | null
  privateMode: boolean | null
  deeplAuthKey: string | null
  deeplIsPro: boolean
  emailRequiredForSignup: boolean
  themeColor: string | null
  defaultLightTheme: string | null
  defaultDarkTheme: string | null
  enableIpLogging: boolean
  enableActiveEmailValidation: boolean
  customMotd: Array<string>
  customSplashIcons: Array<string>
  disableRecommendedTimeline: boolean
  recommendedInstances: Array<string>
  enableGuestTimeline: boolean
  defaultReaction: string
  libreTranslateApiUrl: string | null
  libreTranslateApiKey: string | null
  silencedHosts: Array<string>
  experimentalFeatures: Json
  enableServerMachineStats: boolean
  enableIdenticonGeneration: boolean
  donationLink: string | null
  moreUrls: Json
  markLocalFilesNsfwByDefault: boolean
  antennaLimit: number
}
export interface Migrations {
  id: number
  timestamp: number
  name: string
}
export interface ModerationLog {
  id: string
  createdAt: Date
  userId: string
  type: string
  info: Json
}
export interface MutedNote {
  id: string
  noteId: string
  userId: string
  reason: MutedNoteReasonEnum
}
export interface Muting {
  id: string
  createdAt: Date
  muteeId: string
  muterId: string
  expiresAt: Date | null
}
export interface Note {
  id: string
  createdAt: Date
  replyId: string | null
  renoteId: string | null
  text: string | null
  name: string | null
  cw: string | null
  userId: string
  localOnly: boolean
  renoteCount: number
  repliesCount: number
  reactions: Json
  visibility: NoteVisibilityEnum
  uri: string | null
  score: number
  fileIds: Array<string>
  attachedFileTypes: Array<string>
  visibleUserIds: Array<string>
  mentions: Array<string>
  mentionedRemoteUsers: string
  emojis: Array<string>
  tags: Array<string>
  hasPoll: boolean
  userHost: string | null
  replyUserId: string | null
  replyUserHost: string | null
  renoteUserId: string | null
  renoteUserHost: string | null
  url: string | null
  channelId: string | null
  threadId: string | null
  updatedAt: Date | null
  lang: string | null
}
export interface NoteEdit {
  id: string
  noteId: string
  text: string | null
  cw: string | null
  fileIds: Array<string>
  updatedAt: Date
  emojis: Array<string>
}
export interface NoteFavorite {
  id: string
  createdAt: Date
  userId: string
  noteId: string
}
export interface NoteFile {
  serialNo: number
  noteId: string
  fileId: string
}
export interface NoteReaction {
  id: string
  createdAt: Date
  userId: string
  noteId: string
  reaction: string
}
export interface NoteThreadMuting {
  id: string
  createdAt: Date
  userId: string
  threadId: string
}
export interface NoteUnread {
  id: string
  userId: string
  noteId: string
  noteUserId: string
  isSpecified: boolean
  isMentioned: boolean
  noteChannelId: string | null
}
export interface NoteWatching {
  id: string
  createdAt: Date
  userId: string
  noteId: string
  noteUserId: string
}
export interface Notification {
  id: string
  createdAt: Date
  notifieeId: string
  notifierId: string | null
  isRead: boolean
  noteId: string | null
  reaction: string | null
  choice: number | null
  followRequestId: string | null
  type: NotificationTypeEnum
  userGroupInvitationId: string | null
  customBody: string | null
  customHeader: string | null
  customIcon: string | null
  appAccessTokenId: string | null
}
export interface Page {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  name: string
  summary: string | null
  alignCenter: boolean
  font: string
  userId: string
  eyeCatchingImageId: string | null
  content: Json
  variables: Json
  visibility: PageVisibilityEnum
  visibleUserIds: Array<string>
  likedCount: number
  hideTitleWhenPinned: boolean
  script: string
  isPublic: boolean
}
export interface PageLike {
  id: string
  createdAt: Date
  userId: string
  pageId: string
}
export interface PasswordResetRequest {
  id: string
  createdAt: Date
  token: string
  userId: string
}
export interface Poll {
  noteId: string
  expiresAt: Date | null
  multiple: boolean
  choices: Array<string>
  votes: Array<number>
  noteVisibility: PollNotevisibilityEnum
  userId: string
  userHost: string | null
}
export interface PollVote {
  id: string
  createdAt: Date
  userId: string
  noteId: string
  choice: number
}
export interface PromoNote {
  noteId: string
  expiresAt: Date
  userId: string
}
export interface PromoRead {
  id: string
  createdAt: Date
  userId: string
  noteId: string
}
export interface RegistrationTicket {
  id: string
  createdAt: Date
  code: string
}
export interface RegistryItem {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  key: string
  scope: Array<string>
  domain: string | null
  value: Json | null
}
export interface Relay {
  id: string
  inbox: string
  status: RelayStatusEnum
}
export interface RenoteMuting {
  id: string
  createdAt: Date
  muteeId: string
  muterId: string
}
export interface ReplyMuting {
  id: string
  createdAt: Date
  muteeId: string
  muterId: string
}
export enum AntennaSrcEnum {
  All = 'all',
  Group = 'group',
  Home = 'home',
  Instances = 'instances',
  List = 'list',
  Users = 'users'
}
export enum DriveFileUsageHintEnum {
  UserAvatar = 'userAvatar',
  UserBanner = 'userBanner'
}
export enum MutedNoteReasonEnum {
  Manual = 'manual',
  Other = 'other',
  Spam = 'spam',
  Word = 'word'
}
export enum NoteVisibilityEnum {
  Followers = 'followers',
  Hidden = 'hidden',
  Home = 'home',
  Public = 'public',
  Specified = 'specified'
}
export enum NotificationTypeEnum {
  App = 'app',
  Follow = 'follow',
  FollowRequestAccepted = 'followRequestAccepted',
  GroupInvited = 'groupInvited',
  Mention = 'mention',
  PollEnded = 'pollEnded',
  PollVote = 'pollVote',
  Quote = 'quote',
  Reaction = 'reaction',
  ReceiveFollowRequest = 'receiveFollowRequest',
  Renote = 'renote',
  Reply = 'reply'
}
export enum PageVisibilityEnum {
  Followers = 'followers',
  Public = 'public',
  Specified = 'specified'
}
export enum PollNotevisibilityEnum {
  Followers = 'followers',
  Home = 'home',
  Public = 'public',
  Specified = 'specified'
}
export enum RelayStatusEnum {
  Accepted = 'accepted',
  Rejected = 'rejected',
  Requesting = 'requesting'
}
export enum UserEmojimodpermEnum {
  Add = 'add',
  Full = 'full',
  Mod = 'mod',
  Unauthorized = 'unauthorized'
}
export enum UserProfileFfvisibilityEnum {
  Followers = 'followers',
  Private = 'private',
  Public = 'public'
}
export enum UserProfileMutingnotificationtypesEnum {
  App = 'app',
  Follow = 'follow',
  FollowRequestAccepted = 'followRequestAccepted',
  GroupInvited = 'groupInvited',
  Mention = 'mention',
  PollEnded = 'pollEnded',
  PollVote = 'pollVote',
  Quote = 'quote',
  Reaction = 'reaction',
  ReceiveFollowRequest = 'receiveFollowRequest',
  Renote = 'renote',
  Reply = 'reply'
}
export interface Signin {
  id: string
  createdAt: Date
  userId: string
  ip: string
  headers: Json
  success: boolean
}
export interface SwSubscription {
  id: string
  createdAt: Date
  userId: string
  endpoint: string
  auth: string
  publickey: string
  sendReadMessage: boolean
}
export interface UsedUsername {
  username: string
  createdAt: Date
}
export interface User {
  id: string
  createdAt: Date
  updatedAt: Date | null
  lastFetchedAt: Date | null
  username: string
  usernameLower: string
  name: string | null
  followersCount: number
  followingCount: number
  notesCount: number
  avatarId: string | null
  bannerId: string | null
  tags: Array<string>
  isSuspended: boolean
  isSilenced: boolean
  isLocked: boolean
  isBot: boolean
  isCat: boolean
  isAdmin: boolean
  isModerator: boolean
  emojis: Array<string>
  host: string | null
  inbox: string | null
  sharedInbox: string | null
  featured: string | null
  uri: string | null
  token: string | null
  isExplorable: boolean
  followersUri: string | null
  lastActiveDate: Date | null
  hideOnlineStatus: boolean
  isDeleted: boolean
  driveCapacityOverrideMb: number | null
  movedToUri: string | null
  speakAsCat: boolean
  emojiModPerm: UserEmojimodpermEnum
  isIndexable: boolean
  alsoKnownAs: Array<string> | null
}
export interface UserGroup {
  id: string
  createdAt: Date
  name: string
  userId: string
  isPrivate: boolean
}
export interface UserGroupInvitation {
  id: string
  createdAt: Date
  userId: string
  userGroupId: string
}
export interface UserGroupInvite {
  id: string
  createdAt: Date
  userId: string
  userGroupId: string
}
export interface UserGroupJoining {
  id: string
  createdAt: Date
  userId: string
  userGroupId: string
}
export interface UserIp {
  id: number
  createdAt: Date
  userId: string
  ip: string
}
export interface UserKeypair {
  userId: string
  publicKey: string
  privateKey: string
}
export interface UserList {
  id: string
  createdAt: Date
  userId: string
  name: string
}
export interface UserListJoining {
  id: string
  createdAt: Date
  userId: string
  userListId: string
}
export interface UserNotePining {
  id: string
  createdAt: Date
  userId: string
  noteId: string
}
export interface UserPending {
  id: string
  createdAt: Date
  code: string
  username: string
  email: string
  password: string
}
export interface UserProfile {
  userId: string
  location: string | null
  birthday: string | null
  description: string | null
  fields: Json
  url: string | null
  email: string | null
  emailVerifyCode: string | null
  emailVerified: boolean
  twoFactorTempSecret: string | null
  twoFactorSecret: string | null
  twoFactorEnabled: boolean
  password: string | null
  clientData: Json
  autoAcceptFollowed: boolean
  alwaysMarkNsfw: boolean
  carefulBot: boolean
  userHost: string | null
  securityKeysAvailable: boolean
  usePasswordLessLogin: boolean
  pinnedPageId: string | null
  room: Json
  injectFeaturedNote: boolean
  enableWordMute: boolean
  mutedWords: Json
  mutingNotificationTypes: Array<UserProfileMutingnotificationtypesEnum>
  noCrawle: boolean
  receiveAnnouncementEmail: boolean
  emailNotificationTypes: Json
  mutedInstances: Json
  publicReactions: boolean
  ffVisibility: UserProfileFfvisibilityEnum
  moderationNote: string
  preventAiLearning: boolean
  isIndexable: boolean
  mutedPatterns: Array<string>
  lang: string | null
}
export interface UserPublickey {
  userId: string
  keyId: string
  keyPem: string
}
export interface UserSecurityKey {
  id: string
  userId: string
  publicKey: string
  lastUsed: Date
  name: string
}
export interface Webhook {
  id: string
  createdAt: Date
  userId: string
  name: string
  on: Array<string>
  url: string
  secret: string
  active: boolean
  latestSentAt: Date | null
  latestStatus: number | null
}
export function initializeRustLogger(): void
export function fetchNodeinfo(host: string): Promise<Nodeinfo>
export function nodeinfo_2_1(): Promise<any>
export function nodeinfo_2_0(): Promise<any>
/** NodeInfo schema version 2.0. https://nodeinfo.diaspora.software/docson/index.html#/ns/schema/2.0 */
export interface Nodeinfo {
  /** The schema version, must be 2.0. */
  version: string
  /** Metadata about server software in use. */
  software: Software20
  /** The protocols supported on this server. */
  protocols: Array<Protocol>
  /** The third party sites this server can connect to via their application API. */
  services: Services
  /** Whether this server allows open self-registration. */
  openRegistrations: boolean
  /** Usage statistics for this server. */
  usage: Usage
  /** Free form key value pairs for software specific values. Clients should not rely on any specific key present. */
  metadata: Record<string, any>
}
/** Metadata about server software in use (version 2.0). */
export interface Software20 {
  /** The canonical name of this server software. */
  name: string
  /** The version of this server software. */
  version: string
}
export enum Protocol {
  Activitypub = 'activitypub',
  Buddycloud = 'buddycloud',
  Dfrn = 'dfrn',
  Diaspora = 'diaspora',
  Libertree = 'libertree',
  Ostatus = 'ostatus',
  Pumpio = 'pumpio',
  Tent = 'tent',
  Xmpp = 'xmpp',
  Zot = 'zot'
}
/** The third party sites this server can connect to via their application API. */
export interface Services {
  /** The third party sites this server can retrieve messages from for combined display with regular traffic. */
  inbound: Array<Inbound>
  /** The third party sites this server can publish messages to on the behalf of a user. */
  outbound: Array<Outbound>
}
/** The third party sites this server can retrieve messages from for combined display with regular traffic. */
export enum Inbound {
  Atom1 = 'atom1',
  Gnusocial = 'gnusocial',
  Imap = 'imap',
  Pnut = 'pnut',
  Pop3 = 'pop3',
  Pumpio = 'pumpio',
  Rss2 = 'rss2',
  Twitter = 'twitter'
}
/** The third party sites this server can publish messages to on the behalf of a user. */
export enum Outbound {
  Atom1 = 'atom1',
  Blogger = 'blogger',
  Buddycloud = 'buddycloud',
  Diaspora = 'diaspora',
  Dreamwidth = 'dreamwidth',
  Drupal = 'drupal',
  Facebook = 'facebook',
  Friendica = 'friendica',
  Gnusocial = 'gnusocial',
  Google = 'google',
  Insanejournal = 'insanejournal',
  Libertree = 'libertree',
  Linkedin = 'linkedin',
  Livejournal = 'livejournal',
  Mediagoblin = 'mediagoblin',
  Myspace = 'myspace',
  Pinterest = 'pinterest',
  Pnut = 'pnut',
  Posterous = 'posterous',
  Pumpio = 'pumpio',
  Redmatrix = 'redmatrix',
  Rss2 = 'rss2',
  Smtp = 'smtp',
  Tent = 'tent',
  Tumblr = 'tumblr',
  Twitter = 'twitter',
  Wordpress = 'wordpress',
  Xmpp = 'xmpp'
}
/** Usage statistics for this server. */
export interface Usage {
  users: Users
  localPosts: number | null
  localComments: number | null
}
/** statistics about the users of this server. */
export interface Users {
  total: number | null
  activeHalfyear: number | null
  activeMonth: number | null
}
export function watchNote(watcherId: string, noteAuthorId: string, noteId: string): Promise<void>
export function unwatchNote(watcherId: string, noteId: string): Promise<void>
export function publishToChannelStream(channelId: string, userId: string): void
export enum ChatEvent {
  Message = 'message',
  Read = 'read',
  Deleted = 'deleted',
  Typing = 'typing'
}
export function publishToChatStream(senderUserId: string, receiverUserId: string, kind: ChatEvent, object: any): void
export enum ChatIndexEvent {
  Message = 'message',
  Read = 'read'
}
export function publishToChatIndexStream(userId: string, kind: ChatIndexEvent, object: any): void
export interface PackedEmoji {
  id: string
  aliases: Array<string>
  name: string
  category: string | null
  host: string | null
  url: string
  license: string | null
  width: number | null
  height: number | null
}
export function publishToBroadcastStream(emoji: PackedEmoji): void
export function publishToGroupChatStream(groupId: string, kind: ChatEvent, object: any): void
export interface AbuseUserReportLike {
  id: string
  targetUserId: string
  reporterId: string
  comment: string
}
export function publishToModerationStream(moderatorId: string, report: AbuseUserReportLike): void
export function getTimestamp(id: string): number
/**
 * The generated ID results in the form of `[8 chars timestamp] + [cuid2]`.
 * The minimum and maximum lengths are 16 and 24, respectively.
 * With the length of 16, namely 8 for cuid2, roughly 1427399 IDs are needed
 * in the same millisecond to reach 50% chance of collision.
 *
 * Ref: https://github.com/paralleldrive/cuid2#parameterized-length
 */
export function genId(): string
/** Generate an ID using a specific datetime */
export function genIdAt(date: Date): string
export function secureRndstr(length?: number | undefined | null): string
