import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  Select,
  Spinner
} from '../components/ui';

/**
 * Component Showcase Page
 * Display all UI components for testing and documentation
 */
const ComponentShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [loading, setLoading] = useState(false);

  const selectOptions = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'trap_id', label: 'Sort by Trap ID' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ];

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            UI Component Showcase
          </h1>
          <p className="text-gray-600">
            CRB Dashboard Design System Components
          </p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>Buttons</CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="success">Success</Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">With Icons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button icon={<Plus size={16} />}>Add Trap</Button>
                  <Button variant="outline" icon={<Search size={16} />}>
                    Search
                  </Button>
                  <Button 
                    variant="danger" 
                    icon={<Trash2 size={16} />}
                    iconPosition="right"
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">States</h4>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button loading onClick={handleLoadingTest}>
                    {loading ? 'Loading...' : 'Click to Load'}
                  </Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>Badges</CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Status Badges</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="active">Active</Badge>
                  <Badge variant="offline">Offline</Badge>
                  <Badge variant="maintenance">Maintenance</Badge>
                  <Badge variant="fallen" pulse>Fallen</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>Cards</CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card variant="default">
                <CardContent>
                  <h4 className="font-semibold mb-2">Default Card</h4>
                  <p className="text-sm text-gray-600">
                    Basic card with border
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardContent>
                  <h4 className="font-semibold mb-2">Elevated Card</h4>
                  <p className="text-sm text-gray-600">
                    Card with shadow effect
                  </p>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardContent>
                  <h4 className="font-semibold mb-2">Bordered Card</h4>
                  <p className="text-sm text-gray-600">
                    Card with thick border
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4">
              <Card variant="elevated">
                <CardHeader>Card with All Sections</CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    This card demonstrates the header, content, and footer sections.
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm">Confirm</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <Card>
          <CardHeader>Form Components</CardHeader>
          <CardContent>
            <div className="space-y-6 max-w-md">
              <Input
                label="Trap Name"
                placeholder="Enter trap name"
                value={inputValue}
                onChange={setInputValue}
                helperText="Enter a unique trap identifier"
              />

              <Input
                label="Search"
                placeholder="Search traps..."
                icon={<Search size={18} />}
                iconPosition="left"
              />

              <Input
                label="Email"
                type="email"
                placeholder="user@example.com"
                required
              />

              <Input
                label="Error State"
                placeholder="Invalid input"
                error="This field is required"
              />

              <Select
                label="Sort By"
                options={selectOptions}
                value={selectValue}
                onChange={setSelectValue}
                placeholder="Select sorting option"
                helperText="Choose how to sort the results"
              />

              <Input
                label="Disabled Input"
                placeholder="Cannot edit"
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Icon Buttons */}
        <Card>
          <CardHeader>Icon Buttons</CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <IconButton variant="primary" tooltip="Primary">
                    <Edit size={18} />
                  </IconButton>
                  <IconButton variant="secondary" tooltip="Secondary">
                    <Edit size={18} />
                  </IconButton>
                  <IconButton variant="ghost" tooltip="Ghost">
                    <Edit size={18} />
                  </IconButton>
                  <IconButton variant="danger" tooltip="Delete">
                    <Trash2 size={18} />
                  </IconButton>
                  <IconButton variant="outline" tooltip="Outline">
                    <Plus size={18} />
                  </IconButton>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sizes & Shapes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <IconButton size="sm" tooltip="Small">
                    <Edit size={14} />
                  </IconButton>
                  <IconButton size="md" tooltip="Medium">
                    <Edit size={18} />
                  </IconButton>
                  <IconButton size="lg" tooltip="Large">
                    <Edit size={22} />
                  </IconButton>
                  <IconButton size="md" shape="square" tooltip="Square">
                    <Edit size={18} />
                  </IconButton>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spinners */}
        <Card>
          <CardHeader>Loading Spinners</CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-6">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Colors</h4>
                <div className="flex flex-wrap items-center gap-6">
                  <Spinner color="primary" />
                  <Spinner color="secondary" />
                  <Spinner color="success" />
                  <Spinner color="danger" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">With Text</h4>
                <Spinner size="md" text="Loading data..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <Card>
          <CardHeader>Modal</CardHeader>
          <CardContent>
            <Button onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>

            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Example Modal"
              size="md"
            >
              <ModalContent>
                <p className="text-gray-600 mb-4">
                  This is an example modal dialog. It can contain any content including forms, 
                  images, or other components.
                </p>
                <Input
                  label="Sample Input"
                  placeholder="Enter something..."
                />
              </ModalContent>
              <ModalFooter>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </ModalFooter>
            </Modal>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComponentShowcase;
