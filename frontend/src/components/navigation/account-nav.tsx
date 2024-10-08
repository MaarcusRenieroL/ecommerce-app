import {
  CreditCard,
  Heart,
  LogOut,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "../theme-provider";
import { useNavigate } from "react-router-dom";
import { DashboardIcon } from "@radix-ui/react-icons";

type Props = {
  role: string;
  hasBusiness: boolean;
};

export const AccountNav: FC<Props> = ({ role, hasBusiness }) => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate(0);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {(role === "CUSTOMER" && !hasBusiness) && (
          <a href="/auth/business/sign-up">
            <DropdownMenuItem>
              <DashboardIcon className="h-4 w-4 mr-2" />
              <span>Create a Dashboard</span>
            </DropdownMenuItem>
          </a>
        )}
        {(role === "VENDOR" || role === "ADMIN") && (
          <a href={`/${role.toLowerCase()}/dashboard`}>
            <DropdownMenuItem>
              <DashboardIcon className="h-4 w-4 mr-2"/>
              <span>Dashboard</span>
            </DropdownMenuItem>
          </a>
        )}
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <a href="/account">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </a>
          <a href="/account/payment-options">
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </a>
          <a href="/account/login-and-security">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Switch Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <a href="/account/your-orders">
            <DropdownMenuItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Your Orders</span>
            </DropdownMenuItem>
          </a>
          <a href="/account/your-wishlist">
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              <span>Your Recommendations</span>
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClick}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
