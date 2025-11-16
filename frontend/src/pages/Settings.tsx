import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Lock, 
  Trash2, 
  Download, 
  Eye, 
  EyeOff, 
  Phone, 
  Mail, 
  Key, 
  Smartphone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  Minus,
  ExternalLink
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Mock user data
const mockUser = {
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  dateOfBirth: '1995-03-15',
  phone: '+1 (555) 123-4567',
  backupEmail: 'john.backup@example.com',
  linkedAccounts: [
    { provider: 'Google', email: 'john@gmail.com', connected: true },
    { provider: 'GitHub', username: 'johndoe', connected: true },
    { provider: 'Facebook', connected: false },
    { provider: 'Twitter', connected: false }
  ],
  twoFactorEnabled: true,
  loginDevices: [
    { id: 1, name: 'MacBook Pro', location: 'San Francisco, CA', lastActive: '2 hours ago', current: true },
    { id: 2, name: 'iPhone 13', location: 'San Francisco, CA', lastActive: '1 day ago', current: false },
    { id: 3, name: 'Windows PC', location: 'New York, NY', lastActive: '1 week ago', current: false }
  ],
  profileVisibility: {
    communities: true,
    publicSections: false,
    searchResults: true
  },
  connectedApps: [
    { name: 'Slack', permissions: ['Read profile', 'Send messages'], lastUsed: '2 days ago' },
    { name: 'Discord', permissions: ['Read profile'], lastUsed: '1 week ago' },
    { name: 'Zoom', permissions: ['Read profile', 'Join meetings'], lastUsed: '3 days ago' }
  ]
};

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingRecovery, setIsEditingRecovery] = useState(false);
  const [isAddingPhone, setIsAddingPhone] = useState(false);
  const [isAddingEmail, setIsAddingEmail] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showDeactivateAccount, setShowDeactivateAccount] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    fullName: mockUser.fullName,
    username: mockUser.username,
    dateOfBirth: mockUser.dateOfBirth
  });

  const [recoveryForm, setRecoveryForm] = useState({
    phone: mockUser.phone,
    backupEmail: mockUser.backupEmail
  });

  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleProfileSave = () => {
    console.log('Saving profile:', profileForm);
    setIsEditingProfile(false);
  };

  const handleRecoverySave = () => {
    console.log('Saving recovery info:', recoveryForm);
    setIsEditingRecovery(false);
  };

  const handleAddPhone = () => {
    console.log('Adding phone:', newPhone);
    setIsAddingPhone(false);
    setNewPhone('');
  };

  const handleAddEmail = () => {
    console.log('Adding email:', newEmail);
    setIsAddingEmail(false);
    setNewEmail('');
  };

  const handlePasswordChange = () => {
    console.log('Changing password');
    setShowPasswordChange(false);
  };

  const handleTwoFactorToggle = () => {
    console.log('Toggling 2FA');
  };

  const handleRevokeDevice = (deviceId: number) => {
    console.log('Revoking device:', deviceId);
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account');
    setShowDeleteAccount(false);
  };

  const handleDeactivateAccount = () => {
    console.log('Deactivating account');
    setShowDeactivateAccount(false);
  };

  const handleExportData = () => {
    console.log('Exporting user data');
  };

  const handleRevokeApp = (appName: string) => {
    console.log('Revoking app:', appName);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account, security, and privacy preferences
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="danger">Danger Zone</TabsTrigger>
            </TabsList>

            {/* Account Details Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Details
                  </CardTitle>
                  <CardDescription>
                    View and edit your full name, username, and date of birth
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Information */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Profile Information</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                      >
                        {isEditingProfile ? 'Cancel' : 'Edit'}
                      </Button>
                    </div>
                    
                    {isEditingProfile ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              value={profileForm.fullName}
                              onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              value={profileForm.username}
                              onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={profileForm.dateOfBirth}
                            onChange={(e) => setProfileForm({...profileForm, dateOfBirth: e.target.value})}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleProfileSave}>Save Changes</Button>
                          <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Full Name</Label>
                          <p className="font-medium">{mockUser.fullName}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Username</Label>
                          <p className="font-medium">@{mockUser.username}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Date of Birth</Label>
                          <p className="font-medium">{new Date(mockUser.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Recovery Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Recovery Details</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingRecovery(!isEditingRecovery)}
                      >
                        {isEditingRecovery ? 'Cancel' : 'Edit'}
                      </Button>
                    </div>
                    
                    {isEditingRecovery ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={recoveryForm.phone}
                              onChange={(e) => setRecoveryForm({...recoveryForm, phone: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="backupEmail">Backup Email</Label>
                            <Input
                              id="backupEmail"
                              type="email"
                              value={recoveryForm.backupEmail}
                              onChange={(e) => setRecoveryForm({...recoveryForm, backupEmail: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleRecoverySave}>Save Changes</Button>
                          <Button variant="outline" onClick={() => setIsEditingRecovery(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Phone Number</Label>
                          <p className="font-medium">{mockUser.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Backup Email</Label>
                          <p className="font-medium">{mockUser.backupEmail}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Linked Social Accounts */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Linked Social Accounts</h3>
                    <div className="space-y-3">
                      {mockUser.linkedAccounts.map((account) => (
                        <div key={account.provider} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              account.connected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {account.connected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="font-medium">{account.provider}</p>
                              {account.connected && (
                                <p className="text-sm text-muted-foreground">
                                  {account.email || account.username}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant={account.connected ? "outline" : "default"}
                            size="sm"
                          >
                            {account.connected ? 'Disconnect' : 'Connect'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your password, two-factor authentication, and login devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password Change */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Password</h3>
                        <p className="text-sm text-muted-foreground">
                          Last changed 3 months ago
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowPasswordChange(true)}
                      >
                        Change Password
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Two-Factor Authentication */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={mockUser.twoFactorEnabled}
                          onCheckedChange={handleTwoFactorToggle}
                        />
                        <span className="text-sm font-medium">
                          {mockUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                    {mockUser.twoFactorEnabled && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          ✓ Two-factor authentication is protecting your account
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Login Devices */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Login Devices</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage devices that have access to your account
                    </p>
                    <div className="space-y-3">
                      {mockUser.loginDevices.map((device) => (
                        <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              device.current ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                              <Smartphone className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{device.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {device.location} • {device.lastActive}
                                {device.current && <Badge variant="secondary" className="ml-2">Current</Badge>}
                              </p>
                            </div>
                          </div>
                          {!device.current && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeDevice(device.id)}
                            >
                              Revoke Access
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Data & Privacy
                  </CardTitle>
                  <CardDescription>
                    Control your data visibility and manage connected applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Visibility */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Profile Visibility</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Show in Communities</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow other users to see your profile in community sections
                          </p>
                        </div>
                        <Switch checked={mockUser.profileVisibility.communities} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Show in Public Sections</Label>
                        <Switch checked={mockUser.profileVisibility.publicSections} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Show in Search Results</Label>
                        <Switch checked={mockUser.profileVisibility.searchResults} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Data Export */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Data Export</h3>
                        <p className="text-sm text-muted-foreground">
                          Download a copy of your data
                        </p>
                      </div>
                      <Button onClick={handleExportData}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Connected Apps */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Connected Applications</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage third-party applications with access to your account
                    </p>
                    <div className="space-y-3">
                      {mockUser.connectedApps.map((app) => (
                        <div key={app.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{app.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Permissions: {app.permissions.join(', ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Last used: {app.lastUsed}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRevokeApp(app.name)}
                          >
                            Revoke Access
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact & Recovery Info
                  </CardTitle>
                  <CardDescription>
                    Manage your contact information and recovery options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Phone Numbers */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Phone Numbers</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingPhone(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Phone
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{mockUser.phone}</p>
                            <p className="text-sm text-muted-foreground">Primary</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Verified</Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Recovery Emails */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Recovery Emails</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingEmail(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Email
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{mockUser.email}</p>
                            <p className="text-sm text-muted-foreground">Primary</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Verified</Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{mockUser.backupEmail}</p>
                            <p className="text-sm text-muted-foreground">Backup</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Verified</Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Danger Zone Tab */}
            <TabsContent value="danger" className="space-y-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Deactivate Account */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <h3 className="text-lg font-semibold text-red-800">Deactivate Account</h3>
                        <p className="text-sm text-red-600">
                          Temporarily suspend your account. You can reactivate it later.
                        </p>
                      </div>
                      <AlertDialog open={showDeactivateAccount} onOpenChange={setShowDeactivateAccount}>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                            Deactivate
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Deactivate Account?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will temporarily suspend your account. You can reactivate it at any time by logging in.
                              Your data will be preserved.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeactivateAccount}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Deactivate Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <Separator />

                  {/* Delete Account */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-300 rounded-lg bg-red-50">
                      <div>
                        <h3 className="text-lg font-semibold text-red-800">Delete Account</h3>
                        <p className="text-sm text-red-600">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                      <AlertDialog open={showDeleteAccount} onOpenChange={setShowDeleteAccount}>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Account Permanently?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Modals */}
        
        {/* Password Change Modal */}
        <Dialog open={showPasswordChange} onOpenChange={setShowPasswordChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPasswordChange(false)}>
                Cancel
              </Button>
              <Button onClick={handlePasswordChange}>
                Change Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Phone Modal */}
        <Dialog open={isAddingPhone} onOpenChange={setIsAddingPhone}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Phone Number</DialogTitle>
              <DialogDescription>
                Add a new phone number for account recovery
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  placeholder="+1 (555) 123-4567"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phoneVerification">Verification Code</Label>
                <Input 
                  id="phoneVerification" 
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingPhone(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPhone}>
                Add Phone
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Email Modal */}
        <Dialog open={isAddingEmail} onOpenChange={setIsAddingEmail}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Recovery Email</DialogTitle>
              <DialogDescription>
                Add a new email address for account recovery
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="emailAddress">Email Address</Label>
                <Input 
                  id="emailAddress" 
                  type="email"
                  placeholder="recovery@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emailVerification">Verification Code</Label>
                <Input 
                  id="emailVerification" 
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingEmail(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmail}>
                Add Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Settings;
